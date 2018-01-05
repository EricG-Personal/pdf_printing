import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import './main.css';

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

        var mythis = this;
        var xhr = new XMLHttpRequest();
        // load `document` from `cache`
        xhr.open("GET", "./sample.pdf", true); 
        xhr.responseType = "blob";
        xhr.onload = function (e) 
        {
            if ( this.status === 200 ) 
            {
                console.log( "Load Success" );
                // `blob` response
                console.log(this.response);
                var file = window.URL.createObjectURL(this.response);
                console.log( file );
                mythis.setState({pdfData:file});
            }
        };
        xhr.send();        
    }



    componentDidUpdate()
    {
        console.log( "componentDidUpdate" );

        setTimeout( function() 
        { 
            window.frames["pdf_doc"].focus();
            window.frames["pdf_doc"].print();
        }, 5000);
    }



    render() 
    {
        return (
            <div width="100%" height="100%"> 
                <iframe id="pdf_doc" src={this.state.pdfData} type="application/pdf" width="100%" height="100%" style={{overflow: 'auto'}}>
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