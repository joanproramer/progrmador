document.addEventListener("DOMContentLoaded", function () {
    const htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-editor"), {
        mode: "htmlmixed",
        lineNumbers: true,
        theme: "default"
    });

    const cssEditor = CodeMirror.fromTextArea(document.getElementById("css-editor"), {
        mode: "css",
        lineNumbers: true,
        theme: "default"
    });

    const jsEditor = CodeMirror.fromTextArea(document.getElementById("js-editor"), {
        mode: "javascript",
        lineNumbers: true,
        theme: "default"
    });

    function updatePreview() {
        const htmlContent = htmlEditor.getValue();
        const cssContent = `<style>${cssEditor.getValue()}</style>`;
        const jsContent = `<script>${jsEditor.getValue()}<\/script>`;

        const previewFrame = document.getElementById("preview");
        const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
        preview.open();
        preview.write(htmlContent + cssContent + jsContent);
        preview.close();
    }

    htmlEditor.on("change", updatePreview);
    cssEditor.on("change", updatePreview);
    jsEditor.on("change", updatePreview);
    
    updatePreview(); // Initial preview update

    // Función para descargar el contenido del editor en un archivo con extensión .pm
    window.downloadFile = function(type) {
        let content, fileName;
        if (type === 'html') {
            content = htmlEditor.getValue();
            fileName = 'index_html.pm';
        } else if (type === 'css') {
            content = cssEditor.getValue();
            fileName = 'styles_css.pm';
        } else if (type === 'js') {
            content = jsEditor.getValue();
            fileName = 'script_js.pm';
        }

        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Función para cargar el contenido desde un archivo
    window.loadFile = function(type) {
        const fileInput = document.getElementById(`${type}-upload`);
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (type === 'html') {
                    htmlEditor.setValue(e.target.result);
                } else if (type === 'css') {
                    cssEditor.setValue(e.target.result);
                } else if (type === 'js') {
                    jsEditor.setValue(e.target.result);
                }
                updatePreview();
            };
            reader.readAsText(file);
        }
    };
});
