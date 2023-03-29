

const fileBtn = document.getElementById('fileBtn')
const filePathElement = document.getElementById('filePath')
const input = document.querySelector('.start_num')


fileBtn.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile({
        number: input.value * 1 ? input.value * 1 : 0
    })
    console.log(filePath);
    if (filePath.type === 'success') {
        filePathElement.innerHTML = `Export File Path:<br/><br/>${filePath.filePaths}`;
    } else {
        filePathElement.innerHTML = `Error:<br/><br/> ${filePath.msg}`
    }
});