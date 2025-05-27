// ->: next task page
// <-: previous task page
const keyBind = { ArrowRight: incr, ArrowLeft: decr };

// Add event handler for page move to listener
window.addEventListener('keydown', async function (event) {
    const url = location.href;

    const textarea = document.querySelector('#editor > textarea');

    let newTask;
    if (event.key in keyBind) {
        const task = url.slice(-1);
        newTask = keyBind[event.key](task);
    } else if ('a' <= event.key && event.key <= 'z' && !event.ctrlKey && !event.altKey && !event.metaKey && !textarea.matches(':focus')) {
        newTask = event.key;
    } else {
        return;
    }

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
