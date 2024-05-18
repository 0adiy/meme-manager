// REVIEW - remove in production
#![allow(dead_code)]

use rusqlite::{named_params, Connection};
use std::sync::{Arc, Mutex};
use std::{error::Error, fs, path::Path};

use crate::meme::Meme;

pub struct Database {
    conn: Arc<Mutex<Connection>>,
}

impl Database {
    // private fn for creating db file if not exists
    fn create_db_file_if_not_exists(db_path: &str) {
        if Path::new(db_path).exists() {
            return;
        }
        let db_dir = Path::new(&db_path).parent().unwrap();
        if !db_dir.exists() {
            fs::create_dir_all(db_dir).unwrap();
        }
        fs::File::create(db_path).unwrap();
    }

    // Function to create triggers (consider placing it in a separate module)
    fn create_triggers(conn: &Connection) -> Result<(), Box<dyn Error>> {
        // Trigger for INSERT (already explained in previous response)
        conn.execute(
            "CREATE TRIGGER IF NOT EXISTS after_insert_meme
			AFTER INSERT ON memes
			FOR EACH ROW
			BEGIN
				INSERT INTO memes_fts (id, name, description, tags)
				VALUES (NEW.id, NEW.name, NEW.description, NEW.tags);
			END;",
            [],
        )?;

        // Trigger for UPDATE
        conn.execute(
            "CREATE TRIGGER IF NOT EXISTS after_update_meme
			AFTER UPDATE ON memes
			FOR EACH ROW
			BEGIN
				DELETE FROM memes_fts WHERE id = OLD.id;
				INSERT INTO memes_fts (id, name, description, tags)
				VALUES (NEW.id, NEW.name, NEW.description, NEW.tags);
			END;",
            [],
        )?;

        // Trigger for DELETE
        conn.execute(
            "CREATE TRIGGER IF NOT EXISTS after_delete_meme
			AFTER DELETE ON memes
			FOR EACH ROW
			BEGIN
				DELETE FROM memes_fts WHERE id = OLD.id;
			END;",
            [],
        )?;

        Ok(())
    }

    fn create_memes_table(conn: &Connection) -> Result<(), Box<dyn Error>> {
        conn.execute(
            "CREATE TABLE if NOT EXISTS memes (
							id INTEGER PRIMARY KEY AUTOINCREMENT,
							name        TEXT NOT NULL,
							url         TEXT,
							local_path  TEXT,
							description TEXT,
							tags        TEXT,
							filetype    TEXT
					)",
            (),
        )?;

        Ok(())
    }

    fn create_fts_table(conn: &Connection) -> Result<(), Box<dyn Error>> {
        conn.execute(
            "CREATE VIRTUAL TABLE if NOT EXISTS memes_fts USING fts5(
							id,
							name,
							description,
							tags,
							filetype
					)",
            [],
        )?;

        Ok(())
    }

    // constructor fn ?
    pub fn init(db_path: &str) -> Self {
        Self::create_db_file_if_not_exists(db_path);
        let conn = Connection::open(db_path).unwrap();

        // Create triggers and tables on database connection
        Self::create_memes_table(&conn).unwrap();
        Self::create_fts_table(&conn).unwrap();
        Self::create_triggers(&conn).unwrap();

        Self::new(conn)
    }

    // updating the current instace
    pub fn new(conn: Connection) -> Self {
        Self {
            conn: Arc::new(Mutex::new(conn)),
        }
    }

    // public methods
    pub fn insert_meme(&self, meme: &Meme) -> Result<(), Box<dyn Error>> {
        let conn = self.conn.lock().unwrap();
        let tags: String = meme.tags.join(",");
        // let mut statement = conn.prepare(
        //     "INSERT INTO memes (name, url, local_path, description, tags) VALUES (?, ?, ?, ?, ?)",
        // )?;
        // statement.execute(&[
        //     &meme.name,
        //     &meme.url,
        //     &meme.local_path.as_ref().unwrap_or(&"".to_string()),
        //     &meme.description,
        //     &tags,
        // ])?;

        conn.execute(
            "INSERT INTO memes (name, url, local_path, description, tags, filetype) VALUES (:name, :url, :local_path, :description, :tags, :filetype)",
            named_params! {
                    ":name": meme.name,
                    ":url": meme.url,
                    ":local_path": meme.local_path,
                    ":description": meme.description,
                    ":tags": tags,
										":filetype": meme.filetype
            },
        )?;

        Ok(())
    }

    pub fn search_memes(
        &self,
        query: &str,
        limit: Option<i64>,
        offset: Option<i64>,
    ) -> Result<Vec<Meme>, Box<dyn Error>> {
        let limit = limit.unwrap_or(10);
        let offset = offset.unwrap_or(0);

        // TODO - add validation for query

        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "
        SELECT m.id, m.name, m.url, m.local_path, m.description, m.tags, m.filetype
        FROM memes AS m
        INNER JOIN memes_fts AS fts ON m.id = fts.id
        WHERE memes_fts MATCH ?
				ORDER BY fts.rank 
				LIMIT ? OFFSET ?
        ",
        )?;

        let rows = stmt
            .query_map(
                &[
                    &query,
                    &limit.to_string().as_str(),
                    &offset.to_string().as_str(),
                ],
                |row| {
                    Ok(Meme {
                        id: row.get(0)?,
                        name: row.get(1)?,
                        url: row.get(2)?,
                        local_path: row.get(3)?,
                        description: row.get(4)?,
                        tags: row
                            .get::<usize, String>(5)?
                            .split(',')
                            .map(|s| s.to_string())
                            .collect(),
                        filetype: row.get(6)?,
                    })
                },
            )?
            .collect::<Result<Vec<Meme>, _>>()?;
        Ok(rows)
    }

    pub fn get_memes(
        &self,
        limit: Option<i64>,
        offset: Option<i64>,
    ) -> Result<Vec<Meme>, Box<dyn Error>> {
        let limit = limit.unwrap_or(10);
        let offset = offset.unwrap_or(0);

        let conn = self.conn.lock().unwrap();

        let mut stmt = conn.prepare(
            "SELECT id, name, url, local_path, description, tags, filetype
					FROM memes
					ORDER BY id DESC
					LIMIT ? OFFSET ?
				",
        )?;

        let rows = stmt
            .query_map(&[&limit, &offset], |row| {
                Ok(Meme {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    url: row.get(2)?,
                    local_path: row.get(3)?,
                    description: row.get(4)?,
                    tags: row
                        .get::<usize, String>(5)?
                        .split(',')
                        .map(|s| s.to_string())
                        .collect(),
                    filetype: row.get(6)?,
                })
            })?
            .collect::<Result<Vec<Meme>, _>>()?;
        Ok(rows)
    }

    pub fn get_meme(&self, id: &str) -> Result<Meme, Box<dyn Error>> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "SELECT id, name, url, local_path, description, tags, filetype
						FROM memes WHERE id = ?",
        )?;
        let row = stmt.query_row(&[id], |row| {
            Ok(Meme {
                id: row.get(0)?,
                name: row.get(1)?,
                url: row.get(2)?,
                local_path: row.get(3)?,
                description: row.get(4)?,
                tags: row
                    .get::<usize, String>(5)?
                    .split(',')
                    .map(|s| s.to_string())
                    .collect(),
                filetype: row.get(6)?,
            })
        })?;
        Ok(row)
    }

    pub fn delete_meme(&self, id: &str) -> Result<(), Box<dyn Error>> {
        let conn = self.conn.lock().unwrap();
        let mut statement = conn.prepare("DELETE FROM memes WHERE id = ?")?;
        statement.execute(&[id])?;
        Ok(())
    }

    pub fn update_meme(&self, meme: &Meme) -> Result<(), Box<dyn Error>> {
        let conn = self.conn.lock().unwrap();
        let mut statement = conn.prepare("UPDATE memes SET url = ? WHERE name = ?")?;
        statement
            .execute([meme.id.unwrap()])
            .expect("Failed to update meme");
        // TODO - SQL needs adjustments
        Ok(())
    }

    pub fn clear_memes(&self) -> Result<(), Box<dyn Error>> {
        let conn = self.conn.lock().unwrap();
        let mut statement = conn.prepare("DELETE FROM memes")?;
        statement.execute([])?;
        Ok(())
    }

    // pub fn close(&self) -> Result<(), Box<dyn Error>> {
    //     let conn = self.conn.borrow().take();
    //     if let Some(conn) = conn {
    //         conn.close();
    //     }
    //     Ok(())
    // }

    // pub fn is_empty(&self) -> Result<bool, Box<dyn Error>> {
    //     let conn = self.conn.get_mut().unwrap()

    //     let mut statement = conn.prepare("SELECT COUNT(*) FROM memes")?;
    //     let rows = statement.query_map([], |row| Ok(row.get_ref(0)?))?;
    //     let count: i64 = rows.fold(0, |acc, row| acc + row.unwrap().as_i64().unwrap());
    //     Ok(count == 0)
    // }

    pub fn count_memes(&self) -> Result<usize, Box<dyn Error>> {
        let conn = self.conn.lock().unwrap();
        let mut statement = conn.prepare("SELECT COUNT(*) FROM memes")?;
        let rows = statement.query_map([], |row| Ok(row.get::<usize, i64>(0).unwrap()))?;
        let count: i64 = rows.fold(0, |acc, row| acc + row.unwrap());
        Ok(count as usize)
    }
}
