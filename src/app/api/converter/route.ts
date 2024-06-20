import { convertListToTree } from "@/lib/convertListToTree";

export async function POST(request: Request) {
  const input = await request.json();
  const output = convertListToTree(input);
  return Response.json({ output });
}
