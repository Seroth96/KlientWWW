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
        if (this.token != "") {
            if (this.token.length > 0)
                return true;
        }
        return false;
    }
    logout() {
        this.token = "";
        document.location.replace("NotesApp.html");
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
                        alert(data.message);
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
    constructor(body = "No content", title = "No subject", category = "", tag = "", id = 0, user_id = 0) {
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
        if (username != "" && password != "")
            this.login(username, password);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initializeView();
            this.mailList = new VList();
            this.data = new NotesBox(this.api);
            yield this.getNotesList();
        });
    }
    register(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.api = new Api(username, password);
            yield this.api.register();
        });
    }
    initializeView() {
        document.body.innerHTML = `
                        <nav>
                            <button id="NewNote" class="btn">New note</button>
                            <button id="Logout" class="btn">Logout</button>
                        </nav>
                        
                        <section class="filter">
                            <ul id="menu">
                                <li><select id="SortBy">
                                    <option value="Category">Category</option>
                                    <option value="Tag">Tag</option>
                                </select></li>
                                <li><input id="SortCredentials" type="text"></li>
                                <li><button id="Filter" class="btn">Filter</button></li>
                            </ul>
                        </section>
                        
                        <section class="container">
                            <div id="note" class="left-half">
                        
                            </div>
                        
                            <div id="noteList" class="right-half">
                        
                        
                            </div>
                        </section>
                        
                        
                        <footer>
                            &copy; All rights reserved
                        </footer>
            `;
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.api = new Api(username, password);
            yield this.api.login();
            if (this.isLogged())
                this.init();
        });
    }
    logout() {
        this.api.logout();
    }
    getData() {
        return this.data;
    }
    isLogged() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.isLogged();
        });
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
let app = new Application("", "");
if (document.getElementById('#container_login') == null) {
    document.querySelector('#submit_register').addEventListener('click', (e) => {
        let username = document.getElementById("login").value;
        let password = document.getElementById("password").value;
        app.register(username, password);
    });
    document.querySelector('#submit_login').addEventListener('click', (e) => {
        let username = document.getElementById("login").value;
        let password = document.getElementById("password").value;
        app = new Application(username, password);
    });
}
//# sourceMappingURL=tscript.js.map