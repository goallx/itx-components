// import { createClient } from "@/utils/supabase/server";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const code = searchParams.get("code");
//   const error = searchParams.get("error");
//   const error_description = searchParams.get("error_description");
//   const supabase = await createClient();

//   if (error) {
//     console.error("OAuth error:", error, error_description);
//     return NextResponse.redirect(new URL("/auth/error", request.url));
//   }

//   if (code) {
//     try {
//       // Exchange the code for a session
//       const {
//         data: { session },
//         error: authError,
//       } = await supabase.auth.exchangeCodeForSession(code);

//       if (authError) {
//         console.error("Error exchanging code for session:", authError);
//         return NextResponse.redirect(new URL("/auth/error", request.url));
//       }

//       if (!session) {
//         console.error("No session returned after code exchange");
//         return NextResponse.redirect(new URL("/auth/error", request.url));
//       }

//       // Return a page that will close itself and notify the parent
//       const html = `
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <title>Authentication Successful</title>
//             <style>
//               body {
//                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 height: 100vh;
//                 margin: 0;
//                 background-color: #f5f5f5;
//               }
//               .message {
//                 text-align: center;
//                 padding: 2rem;
//                 background: white;
//                 border-radius: 8px;
//                 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//               }
//               .button {
//                 padding: 10px 20px;
//                 background-color: #4285F4;
//                 color: white;
//                 border: none;
//                 border-radius: 4px;
//                 cursor: pointer;
//                 margin-top: 1rem;
//               }
//             </style>
//             <script>
//               // Notify the parent window that auth is complete
//               if (window.opener) {
//                 window.opener.postMessage({
//                   type: 'AUTH_COMPLETE',
//                   success: true
//                 }, '*');
//               }

//               // Function to close the window
//               function closeWindow() {
//                 window.close();
//               }

//               // Close the window after a short delay
//               setTimeout(closeWindow, 2000);
//             </script>
//           </head>
//           <body>
//             <div class="message">
//               <h2>Authentication Successful!</h2>
//               <p>This window will close automatically.</p>
//               <button class="button" onclick="closeWindow()">Close Now</button>
//             </div>
//           </body>
//         </html>
//       `;

//       return new Response(html, {
//         headers: {
//           "Content-Type": "text/html",
//         },
//       });
//     } catch (error) {
//       console.error("Error in auth callback:", error);
//       return NextResponse.redirect(new URL("/auth/error", request.url));
//     }
//   }

//   // If no code parameter, redirect to error page
//   return NextResponse.redirect(new URL("/auth/error", request.url));
// }

// app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  console.log("@@code", code);
  if (code) await supabase.auth.exchangeCodeForSession(code);

  return NextResponse.redirect(new URL("/after-log-in", request.url));
}
