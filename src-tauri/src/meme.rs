#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct Meme {
    pub id: Option<i64>,
    pub name: String,
    pub url: String,
    pub description: String,
    pub tags: Vec<String>,
}

impl Meme {
    pub fn new(name: String, url: String, description: String, tags: Vec<String>) -> Self {
        Self {
            id: None,
            name,
            url,
            description,
            tags,
        }
    }
}
