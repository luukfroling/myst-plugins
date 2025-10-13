/*
* Plugin which replaces iframes with a QR code and/or thumbnail in PDF builds.
*/ 

import QRCode from "qrcode-generator";
import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";

const image_folder = "qr_images";
let image_path = "/qr_images";

const iframeTransform = {
  name: "iframe-pdf",
  doc: "Replace iframes in PDF builds with QR codes.",
  stage: "document",
  plugin: (opts, utils) => async (tree, vfile) => {
    
    // Detect if we are building a PDF by checking for pdf or typst in the command line arguments
    const isPDF = process.argv.some(arg => arg.includes("pdf") || arg.includes("typst"));

    // Get all nodes for each page
    const rootChildren = tree.children[0]?.children || [];

    if (isPDF) {

        // remove working directory from vfile
        const relativePath = vfile.history[0].replace(process.cwd(), '');

        //remove filename
        const folderPath = relativePath.substring(0, relativePath.lastIndexOf('\\'));

        const images = utils.selectAll('container', tree);

        for (const [index, node] of rootChildren.entries()) {

            if (node.type === "container" && node.children[0]?.type === "iframe") {

                //check if folder exists, if not create it using the relative path
                if (!existsSync(`.${folderPath}\\${image_folder}`)) {
                    mkdirSync(`.${folderPath}\\${image_folder}`);
                }

                const url = node.children[0]?.src || "No link found";

                let caption = node.children[1]?.children[0]?.children[0]?.value || " - ";

                // Let image name be last part of the URL
                const urlParts = url.split('/');
                const lastPart = urlParts[urlParts.length - 1];

                try {
                    node.qr_index = lastPart.replace(/[^a-zA-Z0-9]/g, '_'); // sanitize for filename

                    // Generate QR code (SVG format)
                    const qr = QRCode(0, 'L'); // 0 = auto version, 'L' = error correction level
                    qr.addData(url);
                    qr.make();

                    const svg = qr.createSvgTag({ cellSize: 4, margin: 2 });

                    // Save SVG to file
                    const outputFile = `.${folderPath}\\${image_folder}\\qrcode_${node.qr_index}.svg`;
                    await writeFile(outputFile, svg, "utf8");

                    //Check if the embed is a youtube link
                    if (!url.includes("youtube")) {

                        //Replace node with just qr code to the link
                        node.type = "container";
                        node.kind = "figure";
                        node.children = [
                        {
                            type: "image",
                            url: `qr_images/qrcode_${node.qr_index}.svg`,
                            width: "200px",
                            alt: "QR code"
                        },
                        {
                            type: "paragraph",
                            children: [
                            { type: "text", value: `${caption} - Scan the QR code or click ` },
                            { type: "link", url: url, children: [{ type: "text", value: "here" }] },
                            { type: "text", value: " to go to the video." }
                            ]
                        }
                        
                    ];
                        continue; // Skip non-YouTube links
                    }

                    // Else keep going

                    let youtube_video_id = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
                    let thumbnail = `https://img.youtube.com/vi/${youtube_video_id}/0.jpg`;

                    node.type = "container";
                    node.kind = "figure";
                    node.children = [{
                            type: 'container',
                            kind: 'figure',
                            subcontainer: true,
                            children: [{
                                    type: "image",
                                    url: `qr_images/qrcode_${node.qr_index}.svg`, // updated to .svg
                                    alt: "QR code",
                                } 
                                ]
                        },
                        {
                            type: 'container',
                            kind: 'figure',
                            subcontainer: true,
                            children: [{
                                type: "image",
                                url: thumbnail, // updated to .svg
                                alt: "Thumbnail",
                                title: " - ",
                                align: "center"
                            }
                        ]},
                        { type: "caption",
                            children: [
                                { type: "paragraph",
                                    children: [
                                        { type: "text", value: `${caption} - Scan the QR code or click ` },
                                        { type: "link", url: url, children: [{ type: "text", value: "here" }] },
                                        { type: "text", value: " to go to the video." }
                                    ]}
                            ]
                        }
                    ]
                } catch (err) {
                    console.log("[IFRAME] Error generating QR code:", err);
                }
            }
        }
    }
  },
};

const plugin = {
  name: "Iframe PDF Plugin",
  transforms: [iframeTransform],
};

export default plugin;