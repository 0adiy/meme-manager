#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct Meme {
    pub id: Option<i64>,
    pub name: String,
    pub url: Option<String>,
    pub description: Option<String>,
    pub tags: Vec<String>,
    pub local_path: Option<String>,
    pub filetype: String, // should be Boolean?
}
// TODO - have 2 different structs for read and write
impl Meme {
    pub fn new(
        name: String,
        url: String,
        description: String,
        tags: Vec<String>,
        local_path: String,
        filetype: String,
    ) -> Self {
        Self {
            id: None,
            name,
            url: Some(url),
            description: Some(description),
            tags,
            local_path: Some(local_path),
            filetype,
        }
    }
}
