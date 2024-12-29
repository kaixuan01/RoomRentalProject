import React, { useEffect, useRef, useState } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import '../../Component.css'
import ImageEditor from '@uppy/image-editor';
const UppyComponent = () => {
    const uppyRef = useRef(null);

    const updateDashboardHeight = (uppy) => {
        const files = uppy.getFiles();
        const dashboard = uppy.getPlugin('Dashboard');
        
        // Set the dashboard height based on the number of files
        if (files.length > 0) {
          dashboard.setOptions({ height: null }); // No height limit when files are added
        } else {
          dashboard.setOptions({ height: '300px' }); // Set height to 300px when no files are added
        }
      };

    useEffect(() => {
        const uppy = new Uppy();

        uppy.use(Dashboard, {
            inline: true,
            target: uppyRef.current,
            height: 300,
            width: "100%"
        }).use(ImageEditor, {
            revert: true,
            rotate: true,
            granularRotate: true,
            flip: true,
            zoomIn: true,
            zoomOut: true,
            cropSquare: true,
            cropWidescreen: true,
            cropWidescreenVertical: true,
        });
    
        uppy.on('file-added', () => {
            updateDashboardHeight(uppy);
        });
        
        uppy.on('file-removed', () => {
            updateDashboardHeight(uppy);
        });
    }, []);



    return (
        <div
            ref={uppyRef}
            id="uppy-dashboard"
        ></div>
    );
};

export default UppyComponent;
