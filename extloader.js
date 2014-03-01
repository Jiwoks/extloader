/* Based on the work : http://www.javascriptkit.com/javatutors/loadjavascriptcss2.shtml */

var extloader = function () {
    var i = 0, filesadded = "", stylesadded = "", headLoaded = true;

    this.loadHeadFiles = function (files) {
        headLoaded = false;
        files = eval(files);
        for (i = 0; i < files.length; i++) {
            this.loadHeadFile(files[i][0],files[i][1]);
        }
        headLoaded = true;
    };

    this.loadHeadFile = function (filename, filetype) {
        if (filesadded.indexOf("["+filename+"]")>0){
            return 1;
        }
        if (filetype == "js"){
            var fileref=document.createElement('script');
            fileref.setAttribute("type","text/javascript");
            fileref.setAttribute("src", filename);
        }else if (filetype=="css"){
            var fileref=document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
        if (typeof fileref!=="undefined"){
            document.getElementsByTagName("head")[0].appendChild(fileref);
            filesadded+="["+filename+"]";
            return true;
        }
        return false;
    };

    this.unloadHeadFile = function (filename, filetype) {
        if(typeof filename==='undefined') {
            return;
        }
        if(filename==='') {
            return;
        }
        if(typeof filetype==='undefined'){
            this.unloadHeadFile(filename,'css');
            this.unloadHeadFile(filename,'js');
        }else{
            var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none"; //determine element type to create nodelist from
            var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none"; //determine corresponding attribute to test for
            var allsuspects=document.getElementsByTagName(targetelement);
            for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
                if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1){
                    allsuspects[i].parentNode.removeChild(allsuspects[i]); //remove element by calling parentNode.removeChild()
                    filesadded = filesadded.replace("["+filename+"]","");
                }
            }
        }
    };

    this.unloadHeadFiles = function () {
        if(filesadded==='') {
            return;
        }
        files = filesadded.split("][");
        for (var i=0; i < files.length; i++){
            files[i] = files[i].replace("[","");
            files[i] = files[i].replace("]","");
            this.unloadHeadFile(files[i]);
        }
    };

    this.loadHeadStyle = function (content,id){
        var fileref=document.createElement("style");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("id", id);
            fileref.innerHTML =content;
            document.getElementsByTagName("head")[0].appendChild(fileref);
            stylesadded+="["+id+"]";
    };

    this.unloadStyles = function () {
        files = str.split(stylesadded);
        for (var style in styles){
            style = style.replace("[","");
            style = style.replace("]","");
            this.unloadStyleId(style);
        }
    };

    this.unloadStyleId = function (id) {
        elem=document.getElementById(id);
        if(elem){
            elem.parentNode.removeChild(elem);
        }
    };
};