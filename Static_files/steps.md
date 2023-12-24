Steps for setup static file:

Static files means create image, js or stylesheet file outside .ejs and link it with ejs for using inside pages

> create public folder
> create image, syle or js folder in public
> create all your file inside it as require
> link it in .ejs file 
> render .ejs files in scrip.js file
    > inside script.js, we have to configure .ejs and their path
        > ser dir parh if views directory is in sub dir- app.set('views', '__dirPath');
        > configure ejs- app.set("view engine", "ejs");
    > also configure express.static with public
        > app.use(express.static('./public'));

        
it's a syntax for implimenting name as a variable eg. <%= variable_name %> in .ejs file
