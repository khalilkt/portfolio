import { NextRequest, NextResponse } from "next/server";

interface LinkMetadata {
  title: string | null;
  description: string | null;
  image: string | null;
  url: string;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      console.error("Invalid URL provided:", url);
      return NextResponse.json(
        { error: "Invalid URL", data: url },
        { status: 400 }
      );
    }
    // Fetch the webpage
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      signal: AbortSignal.timeout(5000), // 5 seconds timeout
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch URL" },
        { status: 400 }
      );
    }

    const html = await response.text();

    const metadata = parseMetadata(html, url);

    return NextResponse.json(metadata);
  } catch (error) {
    console.error("Link preview error:", error);
    return NextResponse.json(
      { error: "Failed to generate preview" },
      { status: 500 }
    );
  }
}

function parseMetadata(html: string, url: string): LinkMetadata {
  const metadata: LinkMetadata = {
    title: null,
    description: null,
    image: null,
    url,
  };

  // Open Graph title
  let match = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
  if (match) {
    metadata.title = decodeHtmlEntities(match[1]);
  } else {
    // Fallback to regular title tag
    match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (match) {
      metadata.title = decodeHtmlEntities(match[1]);
    }
  }

  // Open Graph description
  match = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
  if (match) {
    metadata.description = decodeHtmlEntities(match[1]);
  } else {
    // Fallback to meta description
    match = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    if (match) {
      metadata.description = decodeHtmlEntities(match[1]);
    }
  }

  // Open Graph image
  match = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i);
  if (match) {
    let imageUrl = match[1];
    // Convert relative URLs to absolute
    if (imageUrl.startsWith("/")) {
      const urlObj = new URL(url);
      imageUrl = `${urlObj.origin}${imageUrl}`;
    }
    metadata.image = imageUrl;
  }

  return metadata;
}

function decodeHtmlEntities(text: string): string {
  const htmlEntities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
  };

  return text.replace(
    /&[a-zA-Z0-9#]+;/g,
    (entity) => htmlEntities[entity] || entity
  );
}
