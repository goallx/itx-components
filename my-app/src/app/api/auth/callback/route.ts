// app/auth/callback/route.js
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  console.log("@@code", code);
  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error exchanging code for session:", error);
        return NextResponse.redirect(new URL("/auth/error", request.url));
      }

      // Return a page that will close itself and notify the parent
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Authentication Successful</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f5f5f5;
              }
              .message {
                text-align: center;
                padding: 2rem;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
            </style>
            <script>
              // Notify the parent window that auth is complete
              if (window.opener) {
                window.opener.postMessage({ 
                  type: 'AUTH_COMPLETE', 
                  success: true 
                }, '*');
              }
              
              // Close the window after a short delay
              setTimeout(() => {
                window.close();
              }, 1500);
            </script>
          </head>
          <body>
            <div class="message">
              <h2>Authentication Successful!</h2>
              <p>You can now close this window.</p>
            </div>
          </body>
        </html>
      `;

      // return new Response(html, {
      //   headers: {
      //     "Content-Type": "text/html",
      //   },
      // });
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.error("Error in auth callback:", error);
      return NextResponse.redirect(new URL("/auth/error", request.url));
    }
  }

  // If no code parameter, redirect to error page
  return NextResponse.redirect(new URL("/auth/error", request.url));
}
