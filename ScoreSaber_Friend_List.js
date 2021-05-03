// ==UserScript==
// @name         ScoreSaber Friend List
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://scoresaber.com/u/*
// @grant        none
// ==/UserScript==

(function() {
    var IDs = JSON.parse( localStorage.getItem('IDs') || '{}' )

    var navbar = document.getElementsByClassName('has-navbar-fixed-top')[0];
    var navbar_div = document.createElement('div');

    navbar_div.className = 'navbar-start'
    navbar_div.style = "justify-content: center"

    document.body.insertBefore(navbar_div, document.body.childNodes[0])

    function addButton(key) {
        var value = IDs[key]; // Steam ID -> Name
        var newEl = document.createElement('a');
        var newDiv = document.createElement('div');

        newEl.className = 'navbar-item'
        newEl.innerText = value
        newEl.href = 'https://scoresaber.com/u/' + key
        newEl.style['background-color'] = 'lightgray'

        newDiv.className = 'navbar-item'
        // vb3WaYd //
        newDiv.appendChild(newEl)
        navbar_div.appendChild(newDiv)
    }

    // I have no idea how to create a normal thing for this, thanks stackoverflow
    // https://stackoverflow.com/questions/14594346/create-a-config-or-options-page-for-a-greasemonkey-script
    const ui = {
        create: function(contentss) {
            var div = document.createElement('div');
            div.innerHTML = '<div id="mbpcm_modal" style="position: fixed;z-index: 1;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;display:none;"><div id="mbpcm_content" style="background-color: pink;margin: 15% auto;padding: 20px;border: 1px solid black;width: 20%;box-shadow:20px 20px 30px 2px gray;border-radius:7px;"><span id="mbpcm_close" style="float: right;font-size:25px;cursor: pointer;">&times;</span>'+ contentss +'</div></div>';
            document.body.appendChild(div);
            var modal = document.getElementById("mbpcm_modal");
            var close = document.getElementById("mbpcm_close");
            close.onclick = function(){modal.style.display = "none";}
            modal.close = close.onclick
            return modal
        },

        add_opener: function(parent, classs, stylee) {
            var btn = document.createElement("button");
            btn.setAttribute("class", classs);
            btn.setAttribute("style", stylee);
            btn.setAttribute("id", "mbpcm_ui_opener");
            btn.innerHTML = "Add User";
            parent.appendChild(btn);
            var modal = document.getElementById("mbpcm_modal");
            var btnn = document.getElementById("mbpcm_ui_opener");
            btnn.onclick = function() {modal.style.display = "block";}
        },

        addElement: function(el, cls, styl, val, innerHtml, placeholder) {
            var modal = document.getElementById("mbpcm_content");
            var e = document.createElement(el);
            e.setAttribute("class", cls);
            e.setAttribute("style", styl);
            e.setAttribute("value", val);
            e.setAttribute('placeholder', placeholder)
            e.innerHTML = innerHtml;
            modal.appendChild(e);
            return e;
        }
    }

    var menu = ui.create("<h1>Add User</h1>");
    ui.add_opener(navbar_div, "RNmpXc", "nothing");

    var name = ui.addElement("input", "input", "", "", "", "Nickname");
    var steam = ui.addElement("input", "input", "", "", "", "Steam64 ID");

    ui.addElement("button", "button is-dark has-background-grey-dark", "", "", "Add User").onclick = function() {
        IDs[steam.value] = name.value
        localStorage.setItem('IDs', JSON.stringify(IDs))
        addButton(steam.value)
        menu.close()
    }

    Object.keys(IDs).forEach(addButton)
})();


/*
// This code would go in place of tag "vb3WaYd"
        newDiv.onmouseenter = function() {
            newDiv.style['background-color'] = 'gray'
        }
        newDiv.onmouseleave = function() {
            newDiv.style['background-color'] = ''
        }

        // @require      http://code.jquery.com/jquery-3.4.1.min.js
        $.ajax({
            url: newEl.href,
            success: res => {
                let r = $.parseHTML(res);

                $.each(r, (_, el) => {
                    let pro = $(el).attr('property')

                    //if (pro == 'og:title' || pro == 'og:description') {
                    if (pro == 'og:description') {
                        let atts = el.content.split('\n')
                        let c = ''

                        atts.forEach(value => {
                            c += value + '\n' //value.replaceAll(/.*:/g, '') + '\n'
                        })

                        let g = document.createElement('p')
                        g.innerText = c
                        g.className = 'navbar-item'

                        newDiv.appendChild(g)
                    }
                });
            }
        })
*/
