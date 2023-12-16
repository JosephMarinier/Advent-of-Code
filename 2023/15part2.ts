fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const boxes = Array.from(Array(256), () => new Map());
    text.trim().split(",").forEach((step) => {
        const [label, focalLength] = step.split(/[=-]/);
        const hash = label.split("").reduce((hash, char) => (hash + char.charCodeAt(0)) * 17 % 256, 0);
        if (focalLength) {
            boxes[hash].set(label, Number(focalLength));
        } else {
            boxes[hash].delete(label);
        }
    });
    const answer = boxes.reduce((total, box, boxNumber) => [...box.values()].reduce(
        (total, focalLength, slotNumber) => total + (boxNumber + 1) * (slotNumber + 1) * focalLength, total
    ), 0);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
