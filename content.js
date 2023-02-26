// ->: next task page
// <-: previous task page
const keyBind = { ArrowRight: incr, ArrowLeft: decr };

// Add event handler for page move to listener
window.addEventListener('keydown', async function (event) {
    if (!(event.key in keyBind)) {
        return;
    }

    const url = location.href;
    const task = url.slice(-1);

    const newTask = keyBind[event.key](task);
    const newUrl = url.slice(0, -1) + newTask;

    // Move to the next/previous page if it exists.
    if (await existsUrl(newUrl)) {
        location.href = newUrl;
    }
});

// e.g. 'a' -> 'b'
function incr(task, d = 1) {
    return String.fromCharCode(task.charCodeAt(0) + d);
}

// e.g. 'b' -> 'a'
function decr(task) {
    return incr(task, -1);
}


// Check if the page exists
async function existsUrl(url) {
    try {
        const response = await fetch(url);
        return response.ok;
    } catch {
        return false;
    } 
}
