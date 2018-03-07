const officegen = require('officegen');
const docx = officegen ('docx');
const htmlDocx = require('html-docx-js');
const fs = require('fs');
const path = require('path');

(async _ => {

    try {
        // docx.on ( 'finalize', function ( written ) {
        // 			console.log ( 'Finish to create Word file.\nTotal bytes created: ' + written + '\n' );
        // 		});
        //
        // docx.on ( 'error', function ( err ) {
        // 			console.log ( err );
        // 		});
        // const table = [
        // 	[{
        // 		val: "No.",
        // 		opts: {
        // 			cellColWidth: 4261,
        // 			b:true,
        // 			sz: '48',
        // 			shd: {
        // 				fill: "7F7F7F",
        // 				themeFill: "text1",
        // 				"themeFillTint": "80"
        // 			},
        // 			fontFamily: "Avenir Book"
        // 		}
        // 	},{
        // 		val: "Title1",
        // 		opts: {
        // 			b:true,
        // 			color: "A00000",
        // 			align: "right",
        // 			shd: {
        // 				fill: "92CDDC",
        // 				themeFill: "text1",
        // 				"themeFillTint": "80"
        // 			}
        // 		}
        // 	},{
        // 		val: "Title2",
        // 		opts: {
        // 			align: "center",
        // 			cellColWidth: 42,
        // 			b:true,
        // 			sz: '48',
        // 			shd: {
        // 				fill: "92CDDC",
        // 				themeFill: "text1",
        // 				"themeFillTint": "80"
        // 			}
        // 		}
        // 	}],
        // 	[1,'All grown-ups were once children',''],
        // 	[2,'there is no harm in putting off a piece of work until another day.',''],
        // 	[3,'But when it is a matter of baobabs, that always means a catastrophe.',''],
        // 	[4,'watch out for the baobabs!','END'],
        // ]
        //
        // const tableStyle = {
        // 	tableColWidth: 4261,
        // 	tableSize: 24,
        // 	tableColor: "ada",
        // 	tableAlign: "left",
        // 	tableFontFamily: "Comic Sans MS",
        //     borders: true,
        // }
        //
        // const data = [
        //     [
        //         { align: 'right' },
        //         {type: "text",val: "Simple"},
        //         {type: "text",val: " with color",opt: { color: '000088' }},
        //         {type: "text",val: "  and back color.",opt: { color: '00ffff', back: '000088' }},
        //         {type: "linebreak"},
        //         {type: "text",val: "Bold + underline",opt: { bold: true, underline: true }}
        //     ],
        //     {type: "horizontalline"},
        //     [
        //         { backline: 'EDEDED' },
        //         {type: "text",val: "  backline text1.",opt: { bold: true }},
        //         {type: "text",val: "  backline text2.",opt: { color: '000088' }
        //     	}
        //     ],
        //     {type: "text",val: "Left this text.",lopt: { align: 'left' }},
        //     {type: "text",val: "Center this text.",lopt: { align: 'center' }},
        //     {type: "text",val: "Right this text.",lopt: { align: 'right' }},
        //     {type: "text",val: "Fonts face only.",opt: { font_face: 'Arial' }},
        //     {type: "text",val: "Fonts face and size.",opt: { font_face: 'Arial', font_size: 40 }},
        //     {type: "table",val: table,opt: tableStyle},
        //     [
        //         {},
        //         {type: "image",path: path.resolve(__dirname, 'images/sword_001.png')},
        //         {type: "image",path: path.resolve(__dirname, 'images/sword_002.png')}
        //     ],
        // ]
        //
        // const pObj = docx.createByJson(data);
        //
        // const out = fs.createWriteStream ( 'out_json.docx' );
        //
        // out.on ( 'error', function ( err ) {
        // 	console.log ( err );
        // });
        //
        // docx.generate ( out );

        const content = './import_html/leointer_20171019_141742.html';
        const out =  'out_json.docx';

        fs.readFile(content, 'utf-8', function(err, html) {
            if (err) throw err;

            var docx = htmlDocx.asBlob(html);
            fs.writeFile(out, docx, function(err) {
                if (err) throw err;
                else{
                    console.log("Docx has been created");
                }
            });
        });

    } catch (err) {
        console.log(err)
    }
})()
