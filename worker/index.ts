export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === "/api/users") {
      if (request.method === "GET") {
        const { results } = await env.DB.prepare("SELECT * FROM users ORDER BY created_at DESC").all();
        return new Response(JSON.stringify(results), {
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }

      if (request.method === "POST") {
        const body = await request.json() as { name: string, hobbies: string };
        if (!body.name || !body.hobbies) {
          return new Response(JSON.stringify({ error: "Name and hobbies are required" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders }
          });
        }
        const result = await env.DB.prepare(
          "INSERT INTO users (name, hobbies) VALUES (?, ?) RETURNING *"
        ).bind(body.name.trim(), body.hobbies.trim()).first();

        return new Response(JSON.stringify(result), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
          status: 201
        });
      }
    }

    const deleteMatch = url.pathname.match(/^\/api\/users\/(\d+)$/);
    if (deleteMatch && request.method === "DELETE") {
      const id = parseInt(deleteMatch[1], 10);
      await env.DB.prepare("DELETE FROM users WHERE id = ?").bind(id).run();
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    return new Response(null, { status: 404, headers: corsHeaders });
  },
} satisfies ExportedHandler<Env>;
