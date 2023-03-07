

const fileBtn = document.getElementById('fileBtn')
const filePathElement = document.getElementById('filePath')

fileBtn.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile()
    console.log(filePath);
    if (filePath.type === 'success') {
        filePathElement.innerHTML = `Export File Path:<br/><br/>${filePath.filePaths}`;
    } else {
        filePathElement.innerHTML = `Error:<br/><br/> ${filePath.msg}`
    }
})