var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/**
 * Created by user on 2017-01-05.
 */
class Api {
    constructor(login, password) {
        this.token = "";
        this.msgApiUrl = "http://127.0.0.1:8080";
        this.username = login;
        this.password = password;
    }
    isLogged() {
        if (this.token.length > 0)
            return true;
        return false;
    }
    logout() {
        this.token = "";
        document.location.replace("login.html");
    }
    getCurrentNote() {
        return this.currentNote;
    }
    getUrl(endpoint) {
        return this.msgApiUrl + endpoint;
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            let that = this;
            let url = this.getUrl('/api/login');
            let request = new Request(url, {
                method: 'POST',
                body: JSON.stringify({
                    username: that.username,
                    password: that.password
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
            yield fetch(request).then(function (response) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield response.json().then(function (data) {
                        that.token = data.access_token;
                        console.log(data);
                    });
                });
            });
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            let that = this;
            let url = this.getUrl('/api/register');
            let request = new Request(url, {
                method: 'POST',
                body: JSON.stringify({
                    username: that.username,
                    password: that.password
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
            yield fetch(request).then(function (response) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield response.json().then(function (data) {
                        console.log(data);
                    });
                });
            });
        });
    }
    getNotesList() {
        return __awaiter(this, void 0, void 0, function* () {
            let notes = [];
            let url = this.getUrl('/api/Notes');
            let request = new Request(url, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'JWT ' + this.token,
                })
            });
            yield fetch(request).then(function (response) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield response.json().then(function (row) {
                        console.log(row);
                        console.log(row.notes.length);
                        for (let i = 0; i < row.notes.length; i++) {
                            notes.push(new Note(row.notes[i].body, row.notes[i].title, row.notes[i].category_id, row.notes[i].tag_id, row.notes[i].id, row.notes[i].user_id));
                        }
                        return notes;
                    });
                    return notes;
                });
            });
            return notes;
        });
    }
    getNotesListByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            let notes = [];
            let url = this.getUrl('/api/Category/' + category + '/Notes');
            let request = new Request(url, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'JWT ' + this.token,
                })
            });
            yield fetch(request).then(function (response) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield response.json().then(function (row) {
                        console.log(row);
                        console.log(row.notes.length);
                        for (let i = 0; i < row.notes.length; i++) {
                            notes.push(new Note(row.notes[i].body, row.notes[i].title, row.notes[i].category_id, row.notes[i].tag_id, row.notes[i].id, row.notes[i].user_id));
                        }
                        return notes;
                    });
                    return notes;
                });
            });
            return notes;
        });
    }
    getNotesListByTag(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            let notes = [];
            let url = this.getUrl('/api/Tag/' + tag + '/Notes');
            let request = new Request(url, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'JWT ' + this.token,
                })
            });
            yield fetch(request).then(function (response) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield response.json().then(function (row) {
                        console.log(row);
                        console.log(row.notes.length);
                        for (let i = 0; i < row.notes.length; i++) {
                            notes.push(new Note(row.notes[i].body, row.notes[i].title, row.notes[i].category_id, row.notes[i].tag_id, row.notes[i].id, row.notes[i].user_id));
                        }
                        return notes;
                    });
                    return notes;
                });
            });
            return notes;
        });
    }
    getNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let that = this;
            let note;
            let url = this.getUrl('/api/Notes/' + id);
            let request = new Request(url, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'JWT ' + this.token,
                })
            });
            yield fetch(request).then(function (response) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield response.json().then(function (data) {
                        note = new Note(data.body, data.title, data.category_id, data.tag_id, data.id, data.user_id);
                        that.currentNote = note;
                    });
                    return note;
                });
            });
        });
    }
    // public async getUsersList() {
    //     let users: User[] = [];
    //     let url = this.getUrl('/users/');
    //     let request = new Request(url, {
    //         method: 'GET',
    //         headers: new Headers({
    //             'token': this.token
    //         })
    //     });
    //     await fetch(request).then(async function (response) {
    //         await response.json().then(function (row) {
    //             for (let raw of row) {
    //                 users.push(new User(raw.uid, raw.username));
    //             }
    //             return users;
    //         });
    //         return users;
    //     });
    //     return users;
    // }
    send(note) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.getUrl('/api/Notes');
            let request = new Request(url, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'JWT ' + this.token,
                    'Content-type': 'application/json'
                }),
                body: JSON.stringify({
                    body: note.getBody(),
                    category: note.getCategory(),
                    tag: note.getTag(),
                    title: note.getSubject(),
                })
            });
            yield fetch(request).then(function (response) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield response.json().then(function (response) {
                        if (typeof response.id != "undefined") {
                            return true;
                        }
                    });
                    return true;
                });
            });
            return true;
        });
    }
    editNote(id, note) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.getUrl('/api/Notes/' + id);
            let request = new Request(url, {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': 'JWT ' + this.token,
                    'Content-type': 'application/json'
                }),
                body: JSON.stringify({
                    body: note.getBody(),
                    category: note.getCategory(),
                    tag: note.getTag(),
                    title: note.getSubject(),
                })
            });
            yield fetch(request).then(function (response) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield response.json().then(function (response) {
                        if (typeof response.id != "undefined") {
                            return true;
                        }
                    });
                    return true;
                });
            });
            return true;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.getUrl('/api/Notes/' + id);
            let request = new Request(url, {
                method: 'delete',
                headers: new Headers({
                    'Authorization': 'JWT ' + this.token,
                })
            });
            return fetch(request);
        });
    }
}
class Note {
    constructor(body = "No content", title = "No subject", category = "", tag = "inbox", id = 0, user_id = 0) {
        this.body = body;
        this.title = title;
        this.category_id = category;
        this.tag_id = tag;
        this.id = id;
        this.user_id = id;
    }
    getBody() {
        return this.body;
    }
    getSubject() {
        return this.title;
    }
    getCategory() {
        return this.category_id;
    }
    getTag() {
        return this.tag_id;
    }
    getId() {
        return this.id;
    }
    getUser_id() {
        return this.user_id;
    }
}
class NotesBox {
    constructor(api) {
        this.api = api;
        this.notes = [];
        this.currentNote = new Note();
    }
    reload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.getNotesList().then((notes) => this.notes = notes);
            return this.notes;
        });
    }
    getAllNotes() {
        return this.notes;
    }
    getAllNotesByTag(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.getNotesListByTag(tag).then((notes) => this.notes = notes);
            return this.notes;
        });
    }
    getAllNotesByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.getNotesListByCategory(category).then((notes) => this.notes = notes);
            return this.notes;
        });
    }
    getCurrentNote() {
        return this.currentNote;
    }
    sendNote(n) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.send(n);
            yield this.reload();
        });
    }
    getNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.getNote(id);
            this.currentNote = this.api.getCurrentNote();
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.delete(id);
            yield this.reload();
        });
    }
    editNote(id, note) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.editNote(id, note);
            yield this.reload();
        });
    }
}
class Application {
    constructor(username, password) {
        this.api = new Api(username, password);
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mailList = new VList();
            yield this.api.register();
            yield this.api.login();
            this.data = new NotesBox(this.api);
            yield this.getNotesList();
        });
    }
    logout() {
        this.api.logout();
    }
    getData() {
        return this.data;
    }
    getNotesList() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.reload();
            this.mailList.setNotes(this.data.getAllNotes());
        });
    }
    getNotesListByTag(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.getAllNotesByTag(tag);
            this.mailList.setNotes(this.data.getAllNotes());
        });
    }
    getNotesListByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.getAllNotesByCategory(category);
            this.mailList.setNotes(this.data.getAllNotes());
        });
    }
    sendNote(n) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.sendNote(n);
            this.mailList.setNotes(this.data.getAllNotes());
        });
    }
    getNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.getNote(id);
            this.mailList.setNote(this.data.getCurrentNote());
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.deleteNote(id);
            this.mailList.setNotes(this.data.getAllNotes());
        });
    }
    editNote(id, note) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.editNote(id, note);
            this.mailList.setNotes(this.data.getAllNotes());
        });
    }
}
let app = new Application("bach", "to-nie-ja");
if (document.getElementById('#container_login') == null) {
    document.querySelector('#submit_register').addEventListener('click', (e) => {
        let username = document.getElementById("login").value;
        let password = document.getElementById("password").value;
        let app = new Application(username, password);
        console.log("klik!");
    });
    document.querySelector('#submit_login').addEventListener('click', (e) => {
        let username = document.getElementById("login").value;
        let password = document.getElementById("password").value;
        console.log("klik!2");
        document.location.href = "index_pl.html";
    });
}
//# sourceMappingURL=tscript.js.map