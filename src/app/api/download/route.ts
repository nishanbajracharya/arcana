import path from 'node:path';
import AdmZip from 'adm-zip';

export async function GET() {
  const headers = new Headers();
  headers.append('Content-Disposition', 'attachment; filename=terraform-bundle.zip');
  headers.append('Content-Type', 'application/zip');

  const zip = new AdmZip();
  zip.addLocalFolder(path.join(process.cwd(), '../terraform-bundle'));

  const zipBuffer = zip.toBuffer();

  return new Response(zipBuffer, {
    headers,
  });
}
