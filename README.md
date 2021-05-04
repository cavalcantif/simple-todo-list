# **ToDo List**

## **Application Dependencies**
### **Dependencies**
- @fortawesome/fontawesome-free: 5.15.2
- bootstrap: ^4.6.0
- jquery: ^3.6
- popper.js: 1.16.1
- react: ^17.0.2
- react-dom: ^17.0.2
- reactstrap: ^8.9.0
- react-toastify: 7.0.4

### **Dev Dependencies**
- @babel/preset-react: ^7.13.13
- axios: ^0.21
- laravel-mix: ^6.0.6
- lodash: ^4.17.19
- postcss: ^8.1.14
- resolve-url-loader: ^3.1.2
- sass: ^1.32.11
- sass-loader: ^11.0.1

---

## **Installation**

### **Server Requirements**
- Apache2
- MySQL >= 8.0
- PHP >= 7.3
- BCMath PHP Extension
- Ctype PHP Extension
- Fileinfo PHP Extension
- JSON PHP Extension
- Mbstring PHP Extension
- OpenSSL PHP Extension
- PDO PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension
- Composer >= 2.0
- NPM >= 7.4
- GIT >= 2.2

<br>

### **Application Server Configuration (Apache 2)**

#### **Step One - Directory Structure**

- sudo mkdir -p /var/www/html/todo-list

> The */todo-list/* represents the domain name we want to serve from our VPS.

<br>

#### **Step Two - Ownership and Permissions**

- sudo chown -R \$USER:\$USER /var/www/html/todo-list
- sudo chmod -R 755 /var/www/html/

<br>

#### **Step Three - Virtual Host Configuration**

- sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/todo-list.conf
- sudo nano /etc/apache2/sites-available/todo-list.conf

The file will look something like this:

> \<VirtualHost *:80>
> 
>     DocumentRoot /var/www/html/todo-list/public
>     ServerName todo-list
> 
>     <Directory /var/www/html/todo-list/public>
>         AllowOverride All
>         Order allow,deny
>         Allow from all
>     </Directory>
> 
> \</VirtualHost>

<br/>

- sudo a2ensite /etc/apache2/sites-available/todo-list.conf
- sudo a2enmod rewrite
- sudo service apache2 restart
- sudo nano /etc/hosts

Add the following line:
> 127.0.1.1 todo-list

<br/>

### **Application Deploy and Configuration**

- Create a MySQL database for the application
- Create a databse user for the application
- Download the application from the GIT repository to the var/www/html/todo-list directory
- Change the file var/www/html/todo-list/config/app.php to reflect the application basic information, such as name, url
- Change the file var/www/html/todo-list/config/database.php to reflect your database access information
- Set the permissions on the storage and cache directories as following:

> sudo chmod -R 777 /var/www/html/todo-list/storage
> 
> sudo chmod -R 777 /var/www/html/todo-list/bootstrap/cache

- Install the application dependencies running the folowing command in the /var/www/html/todo-list directory:

> npm install

- Compile the application, runing the following command in the /var/www/html/todo-list directory:

> npm run prod (or npm run dev, depending on the enviroment you want to run the application)

- Create the database tables running the following command in /var/www/html/todo-list directory:

> php artisan migrate

- Pupulate the database tables with initial data running the following command in /var/www/html/todo-list directory:

> php artisan db:seed

<br />

## **Relevant Folders Structure Information**

### **Frontend Folders Structure**
- *resources/js/components*: contains javascript reactJs components used by pages components
- *resources/js/helpers*: contains javascript class helpers
- *resources/js/services*: contains javascrit services classes wich provide connections to api endpoints for each application functionality
- *resources/js/views*: contains react components for the functionalities pages
- *resources/css*: contains custom css files

> **Basic Frontend Flow**
> 
> ViewComponent <--> JavaScriptService <--> BackendApiEndpoints
