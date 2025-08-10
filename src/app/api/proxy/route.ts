import { NextRequest, NextResponse } from "next/server";
import {cookies} from "next/headers";

export async function POST(req: NextRequest) {
    try {
        console.log("API PROXY")
        const { endpoint, body } = await req.json();
        const cookieStores = await cookies();

        if (!endpoint) return new NextResponse("Missing endpoint parameter", { status: 400 });

        const apiPath = process.env[endpoint as string];
        if (!apiPath) return new NextResponse(`Invalid endpoint: ${endpoint}`, { status: 404 });

        const fullApiUrl = `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`;
        console.log(fullApiUrl)

        const headers = new Headers(req.headers);
        headers.delete("content-length");
        headers.set("Content-Type", "application/json");

        const accessToken = cookieStores.get("API_ACCESS_TOKEN")?.value;
        if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

        const fetchOptions: RequestInit = {
            method: "POST",
            headers,
            credentials: "include",
            body: JSON.stringify(body),
        };

        const response = await fetch(fullApiUrl, fetchOptions);
        if (!response.ok) {
            const errorText = await response.text();
            return new NextResponse(errorText, { status: response.status });
        }

        const responseData = await response.text();
        return new NextResponse(responseData, {
            status: response.status,
            headers: response.headers,
        });

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "Server error", details: error instanceof Error ? error.message : String(error) }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
