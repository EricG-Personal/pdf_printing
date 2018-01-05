import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import './main.css';

const PDFDocument = require( 'pdfkit' );
const blobStream  = require( 'blob-stream');

class PDFTest extends Component 
{
    constructor( props ) 
    {
        super(props);

        
        this.state = {
            file:     './sample.pdf',
            numPages: null,
            pdfData:  null
        }

        var image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAIklEQVR4nGL4z4AfEpAmXgE2uVEF5CjADSlXAAAAAP//AwAlXf8BrF6/6QAAAABJRU5ErkJggg==";
    
        var doc = new PDFDocument( { size: 'legal' } );
        
        this.stream = doc.pipe( blobStream() );

        doc.fontSize( 9 );
        doc.font( 'Times-Roman' );
        doc.text( "hello, world! I'm really here" );
        doc.rect( 10, 10, 100, 100 ).stroke();
        doc.end();

        this.stream.on( 'finish', function() 
        {
            console.log( "Stream Finished" );

            this.setState( { pdfData: this.stream.toBlobURL( 'application/pdf' ) } );
        }.bind( this ) );      
    }



    componentDidUpdate()
    {
        console.log( "componentDidUpdate" );


    }



    iframeloaded()
    {
        console.log( "iframe loaded" );

        window.frames[0].focus();
        window.frames[0].print();
    }



    render() 
    {
        return (
            <div width="100%" height="100%"> 
                <iframe id="pdf_doc" src={this.state.pdfData} type="application/pdf" width="100%" height="100%" style={{overflow: 'auto'}} onLoad={this.iframeloaded.bind( this )}>
                </iframe>
            </div>
        );
    }
}

const app = (
    <div>
        <PDFTest />
    </div>
);

const mountingPoint = document.createElement( 'div' );

mountingPoint.className = 'react-app';

document.body.appendChild( mountingPoint );

ReactDOM.render( app, mountingPoint );