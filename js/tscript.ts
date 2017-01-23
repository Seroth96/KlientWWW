
/**
 * Created by user on 2017-01-05.
 */
class Api {
    private token: string = "";
    private msgApiUrl = "http://127.0.0.1:8080";
    private username: string;
    private password: string;
    private currentNote: Note;

    constructor(login: string, password: string) {
        this.username = login;
        this.password = password;
    }


    public isLogged(){
        if(this.token != "") {
            if (this.token.length > 0)
                return true;
        }
        return false
    }

    public logout() {
        this.token = "";
        document.location.replace("NotesApp.html");
    }

    public getCurrentNote(){
        return this.currentNote;
    }

    private getUrl(endpoint: string) {
        return this.msgApiUrl + endpoint;
    }

    public async login() {
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
        await fetch(request).then(async function (response) {
            await response.json().then(function (data) {
                that.token = data.access_token;
            });
        });
    }

    public async register() {
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
        await fetch(request).then(async function (response) {
            await response.json().then(function (data) {
                alert(data.message);
            });
        });
    }

    public async getNotesList() {
        let notes: Note[] = [];
        let url = this.getUrl('/api/Notes');
        let request = new Request(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'JWT ' + this.token,
            })
        });
        await fetch(request).then(async function (response) {
            await response.json().then(function (row) {
                 for(let i=0; i<row.notes.length; i++){
                    notes.push(new Note(row.notes[i].body,
                        row.notes[i].title,
                        row.notes[i].category_id,
                        row.notes[i].tag_id,
                        row.notes[i].id,
                        row.notes[i].user_id))
                }
                return notes;
            });
            return notes;
        });
        return notes;
    }

    public async getNotesListByCategory(category: string) {
        let notes: Note[] = [];
        let url = this.getUrl('/api/Category/'+category+'/Notes');
        let request = new Request(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'JWT ' + this.token,
            })
        });
        await fetch(request).then(async function (response) {
            await response.json().then(function (row) {
                for(let i=0; i<row.notes.length; i++){
                    notes.push(new Note(row.notes[i].body,
                        row.notes[i].title,
                        row.notes[i].category_id,
                        row.notes[i].tag_id,
                        row.notes[i].id,
                        row.notes[i].user_id))
                }
                return notes;
            });
            return notes;
        });
        return notes;
    }

    public async getNotesListByTag(tag: string) {
        let notes: Note[] = [];
        let url = this.getUrl('/api/Tag/'+tag+'/Notes');
        let request = new Request(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'JWT ' + this.token,
            })
        });
        await fetch(request).then(async function (response) {
            await response.json().then(function (row) {
                for(let i=0; i<row.notes.length; i++){
                    notes.push(new Note(row.notes[i].body,
                        row.notes[i].title,
                        row.notes[i].category_id,
                        row.notes[i].tag_id,
                        row.notes[i].id,
                        row.notes[i].user_id))
                }
                return notes;
            });
            return notes;
        });
        return notes;
    }

    public async getNote(id: number) {
        let that = this;
        let note: Note;
        let url = this.getUrl('/api/Notes/'+id);
        let request = new Request(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'JWT ' + this.token,
            })
        });
        await fetch(request).then(async function (response) {
            await response.json().then(function (data) {
                note = new Note(data.body,
                    data.title,
                    data.category_id,
                    data.tag_id,
                    data.id,
                    data.user_id);
                that.currentNote = note;
            });
            return note;
        });

    }

    public async send(note: Note) {
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
        await fetch(request).then(async function (response) {
            await response.json().then(function (response) {
                if (typeof response.id != "undefined") {
                    return true;
                }
            });
            return true;
        });
        return true;
    }

    public async editNote(id: number, note: Note) {
        let url = this.getUrl('/api/Notes/'+id);
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
        await fetch(request).then(async function (response) {
            await response.json().then(function (response) {
                if (typeof response.id != "undefined") {
                    return true;
                }
            });
            return true;
        });
        return true;
    }

    public async delete(id: number) {
        let url = this.getUrl('/api/Notes/' + id);
        let request = new Request(url, {
            method: 'delete',
            headers: new Headers({
                'Authorization': 'JWT ' + this.token,
            })
        });
        return fetch(request);
    }

}

class Note{
    private body: string;
    private title: string;
    private category_id: string;
    private tag_id: string;
    private id: number;
    private user_id: number;

    public constructor(body: string = "No content", title: string = "No subject",
                       category: string = "", tag: string = "", id: number = 0, user_id: number = 0) {
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

    getUser_id(){
        return this.user_id;
    }


}


class NotesBox {
    private notes: Note[];
    private api: Api;
    private currentNote: Note;

    public constructor(api: Api) {
        this.api = api;
        this.notes = [];
        this.currentNote = new Note();
    }

    public async reload() {
        await this.api.getNotesList().then((notes) => this.notes = notes);
        return this.notes;
    }


    public getAllNotes() {
        return this.notes;
    }

    public async getAllNotesByTag(tag: string) {
        await this.api.getNotesListByTag(tag).then((notes) => this.notes = notes);
        return this.notes;
    }

    public async getAllNotesByCategory(category: string) {
        await this.api.getNotesListByCategory(category).then((notes) => this.notes = notes);
        return this.notes;
    }

    public getCurrentNote(){
        return this.currentNote;
    }

    public async sendNote(n: Note) {
        await this.api.send(n);
        await this.reload();
    }

    public async getNote(id: number){
        await this.api.getNote(id);
        this.currentNote = this.api.getCurrentNote();
    }


    public async deleteNote(id: number) {
        await this.api.delete(id);
        await this.reload();
    }

    public async editNote(id: number, note: Note) {
        await this.api.editNote(id, note);
        await this.reload();
    }
}

class Application {
    private api: Api;
    private mailList: VList;
    private data: NotesBox;

    constructor(username: string, password: string) {
        this.api = new Api(username, password);
        if(username !="" && password!="")
            this.login(username,password);
    }

    public  async init() {
        this.initializeView();
        this.mailList = new VList();
        this.data = new NotesBox(this.api);
        await this.getNotesList();
    }

    public async register(username: string, password: string){
        this.api = new Api(username, password);
        await this.api.register();
    }

    public initializeView(){
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

    public async login(username: string, password: string){
        this.api = new Api(username, password);
        await this.api.login();
       if(this.isLogged())
           this.init();

    }

    public logout() {
        this.api.logout();
    }
    public getData(){
        return this.data;
    }
    public async isLogged(){
        return this.api.isLogged();
    }

    public async getNotesList(){
        await this.data.reload();
        this.mailList.setNotes(this.data.getAllNotes());
    }

    public async getNotesListByTag(tag: string){
        await this.data.getAllNotesByTag(tag);
        this.mailList.setNotes(this.data.getAllNotes());
    }

    public async getNotesListByCategory(category: string){
        await this.data.getAllNotesByCategory(category);
        this.mailList.setNotes(this.data.getAllNotes());

    }

    public async sendNote(n: Note) {
        await this.data.sendNote(n);
        this.mailList.setNotes(this.data.getAllNotes());
    }

    public async getNote(id: number){
        await this.data.getNote(id);
        this.mailList.setNote(this.data.getCurrentNote());
    }

    public async deleteNote(id: number) {
        await this.data.deleteNote(id);
        this.mailList.setNotes(this.data.getAllNotes());
    }

    public async editNote(id: number, note: Note) {
        await this.data.editNote(id, note);
        this.mailList.setNotes(this.data.getAllNotes());
    }
}


 let app = new Application("","");


if(document.getElementById('#container_login') == null ) {


    document.querySelector('#submit_register').addEventListener('click', (e) => {

        let username = (<HTMLInputElement>document.getElementById("login")).value;
        let password = (<HTMLInputElement>document.getElementById("password")).value;

        app.register(username,password);



    });


    document.querySelector('#submit_login').addEventListener('click', (e) => {
        let username = (<HTMLInputElement>document.getElementById("login")).value;
        let password = (<HTMLInputElement>document.getElementById("password")).value;

        app = new Application(username, password);




    });

}










