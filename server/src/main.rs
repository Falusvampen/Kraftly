use rouille::{Response, Server};
use std::path::Path;

fn main() {
    let bind_addr = "0.0.0.0:80";
    println!("Webbserver startad på {}", bind_addr);

    let server = Server::new(bind_addr, |request| {
        
        let response = rouille::match_assets(request, "/app/static");

        if response.is_success() {
            // Sätt caching-headers för statiska filer med hashade namn
            if request.url().starts_with("/assets/") {
                response.with_additional_header("Cache-Control", "public, max-age=31536000, immutable")
            } else {
                response.with_additional_header("Cache-Control", "no-cache")
            }
        } else {
            // 2. Om en resurs under /assets/ saknas, returnera 404 istället för index.html
            if request.url().starts_with("/assets/") {
                return Response::text("Filen hittades inte").with_status_code(404);
            }

            // 3. SPA-fallback: Skicka alltid index.html för frontend-routing
            let index_path = Path::new("/app/static/index.html");
            match std::fs::File::open(index_path) {
                Ok(file) => Response::from_file("text/html; charset=utf8", file)
                    .with_additional_header("Cache-Control", "no-cache"),
                Err(_) => Response::text("404: index.html saknas").with_status_code(404),
            }
        }
    }).expect("Kunde inte binda till port 80");

    server.run();
}