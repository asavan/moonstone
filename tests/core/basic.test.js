import test from "node:test";
import assert from "node:assert/strict";

test("hello", () => {
    const message = "Hello";
    assert.equal(message, "Hello", "checking the greeting");
});

test("save and restore", () => {
    const now = new Date();
    const toSave = {value: "sentence", date: now};
    const str = JSON.stringify(toSave);
    const restore = JSON.parse(str);
    restore.date = new Date(restore.date);
    assert.equal(restore.value, "sentence", "equal str");
    assert.equal(restore.date.getTime(), now.getTime(), "equal date");
});
