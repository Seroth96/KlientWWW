/**
 * Created by user on 2017-01-06.
 */
class ViewNote {
    constructor(note) {
        this.selector = document.querySelector("#note");
        this.note = note;
        this.selector.innerHTML = this.show();
    }
    getNote() {
        return this.note;
    }
    show() {
        if (typeof this.note == "undefined") {
            return "<p>No message selected</p>";
        }
        else {
            return `
            
            <dl>                
                <dt>Subject:</dt>
                <dd><em>${this.note.getSubject()}</em></dd>                            
                <dt>Category:</dt>
                <dd>${this.note.getCategory()}</dd>
                <dt>Tag:</dt>
                <dd>${this.note.getTag()}</dd>
                <dt>Content:</dt>
                <dd><p>${this.note.getBody()}</p></dd>
            </dl>
            <button id="delete" class="btn">Delete this message</button>
            <button id="edit" class="btn">Edit this message</button>
            
        `;
        }
    }
}
class VNoteList {
    constructor(messages) {
        this.messages = messages;
    }
    show() {
        let temp = ``;
        for (let item of this.messages) {
            if (typeof item != "undefined") {
                temp += `
                <tr id=${item.getId()}>
                    <td>${item.getSubject()}</td>
                    <td>${item.getCategory()}</td>
                    <td>${item.getTag()}</td>
                    
                </tr> `;
            }
        }
        return temp;
    }
}
class VSavingNote {
    constructor() {
        this.selector = document.querySelector('#note');
        this.show();
    }
    show() {
        let temp = `
         <span id="formularz">
            <p>Podaj tytuł wiadomości:</p>
            <input id="Subject" type="text">
            <p>Podaj kategorie:</p>
            <input id="Category" type="text">
            <p>Podaj etykiete:</p>
            <input id="Tag" type="text">
            <p>Wpisz tekst wiadomości:</p>
            <textarea id="Content" cols="8" rows="8"></textarea>
            <input id="Send" class="btn" type="submit" value="Dodaj">
        </span>    
`;
        this.selector.innerHTML = temp;
        document.querySelector("#NewNote").addEventListener('click', () => {
            this.show();
        });
        document.querySelector("#Logout").addEventListener('click', () => {
            app.logout();
        });
        document.querySelector("#Filter").addEventListener('click', () => {
            let selected = document.getElementById("SortBy").value;
            let cred = document.getElementById("SortCredentials").value;
            if (cred.length == 0)
                app.getNotesList();
            else {
                if (selected == "Tag")
                    app.getNotesListByTag(cred);
                else
                    app.getNotesListByCategory(cred);
            }
        });
        document.querySelector("#Send").addEventListener('click', (event) => {
            let title = document.getElementById("Subject").value;
            let body = document.getElementById("Content").value;
            let category = document.getElementById("Category").value;
            let tag = document.getElementById("Tag").value;
            let note = new Note(body, title, category, tag, 0, 0);
            app.sendNote(note);
            document.getElementById("Subject").value = "";
            document.getElementById("Content").value = "";
            document.getElementById("Category").value = "";
            document.getElementById("Tag").value = "";
        });
        return temp;
    }
}
class VList {
    constructor() {
        this.selector = document.querySelector("#noteList");
        this.list = new VNoteList([]);
        this.mailing = new VSavingNote();
        this.show();
    }
    show() {
        let temp = `
        <table id="noteBox">
            <thead>
            <tr>
                <th>Message title</th>
                <th>Category</th>
                <th>Tag</th>
                
            </tr>
            </thead>
            <tbody >
                ${this.list.show()}            
            </tbody>
        </table>
`;
        this.selector.innerHTML = temp;
        document.querySelector("#noteBox").addEventListener('click', (event) => {
            var target = event.target;
            var x = target.parentElement;
            var id = +x.id;
            if (target.nodeName === "TD") {
                if (typeof id != "undefined") {
                    //this.setMessage(this.list.getMessage(id));
                    app.getNote(id);
                }
            }
            if (target.nodeName === "B") {
                if (typeof +x.parentElement.id != "undefined") {
                    //this.setMessage(this.list.getMessage(+x.parentElement.id));
                    app.getNote(+x.parentElement.id);
                }
            }
        });
        return temp;
    }
    setNotes(list) {
        this.list = new VNoteList(list);
        this.show();
    }
    setNote(note) {
        this.content = new ViewNote(note);
        document.querySelector("#delete").addEventListener('click', (event) => {
            var id = this.content.getNote().getId();
            if (typeof id != "undefined") {
                app.deleteNote(id);
                this.mailing.show();
            }
        });
        document.querySelector("#edit").addEventListener('click', (event) => {
            var id = this.content.getNote().getId();
            let temp = `
         <span id="formularz">
            <p>Podaj nowy tytuł wiadomości:</p>
            <input id="Title" type="text" value="${this.content.getNote().getSubject()}">
            <p>Podaj nową kategorie:</p>
            <input id="Category" type="text" value="${this.content.getNote().getCategory()}">
            <p>Podaj nową etykiete:</p>
            <input id="Tag" type="text" value="${this.content.getNote().getTag()}">
            <p>Wpisz nowy tekst wiadomości:</p>
            <textarea id="Body" cols="8" rows="8">${this.content.getNote().getBody()}</textarea>
            <input id="Edit" class="btn" type="submit" value="Edytuj">
        </span>    
`;
            document.querySelector('#note').innerHTML = temp;
            document.querySelector("#Edit").addEventListener('click', (event) => {
                let title = document.getElementById("Title").value;
                let body = document.getElementById("Body").value;
                let category = document.getElementById("Category").value;
                let tag = document.getElementById("Tag").value;
                let note = new Note(body, title, category, tag, 0, 0);
                if (typeof id != "undefined") {
                    app.editNote(id, note);
                }
                this.content = new ViewNote(note);
            });
        });
        this.show();
    }
}
//# sourceMappingURL=VMessages.js.map