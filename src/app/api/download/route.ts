import { NextRequest, NextResponse } from 'next/server';
const archiver = require('archiver');
const path = require('path');
const fs = require('fs');

export async function POST(req: NextRequest, res: NextResponse) {

    const terraformFolder = '../../../../../terraform-bundle';
    const zipName = 'terraform.zip';

    // Create a writable stream for the response
    const output = fs.createWriteStream(path.join(__dirname, zipName));

    // Create a new archive
    const archive = archiver('zip', {
        zlib: { level: 9 },
    });

    // Pipe the archive to the response stream
    archive.pipe(output);

    // Add the contents of the terraform folder to the archive
    archive.directory(terraformFolder, false);

    // Finalize the archive
    archive.finalize();

    // Set response headers
    res.setHeader('Content-Disposition', `attachment; filename="${zipName}"`);
}