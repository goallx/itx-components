import { NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho";

async function getCourseThumbnail(recordId: string, accessToken: string) {
  const res = await fetch(
    `https://www.zohoapis.com/crm/v2/Courses/${recordId}/photo`,
    {
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
    }
  );

  if (!res.ok) return null;

  const buffer = Buffer.from(await res.arrayBuffer());
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

export async function GET(req: Request) {
  try {
    const { access_token } = await getZohoAccessToken();

    const res = await fetch("https://www.zohoapis.com/crm/v2/Courses", {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    const courses = await Promise.all(
      data.data.map(async (course: any) => {
        let thumbnail = null;
        if (course.id) {
          thumbnail = await getCourseThumbnail(course.id, access_token);
        }

        return {
          id: course.id,
          name: course.Name,
          courseCode: course.Course_Code,
          description: course.Description,
          price: course.Price,
          thumbnail,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: courses,
      message: "Courses fetched successfully",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
