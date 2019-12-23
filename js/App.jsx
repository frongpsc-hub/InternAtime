
class UIcontent extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            status :'',
            edituserid : ''


        };
        this.eiei=this.eiei.bind(this);
        this.loginstat=this.loginstat.bind(this);
        this.logoutfin=this.logoutfin.bind(this);
        this.signupfin=this.signupfin.bind(this);
        this.stat=this.stat.bind(this);
        this.editfin=this.editfin.bind(this);
        this.adminfin=this.adminfin.bind(this);


    }

    componentDidMount(){
        fetch('http://localhost/account/welcome/checkstatus', {
            credentials: 'include'
        })
            .then(image => image.json())
            .then(image => {
                //console.log('image',image);

                const {success,data} = image;
                console.log(success);
                if (success) {
                    this.setState({
                        status : 'Online',
                        username : data
                    });
                }


            });
    }

    loginstat(w,username) {
        if (w === "Online") {
            this.setState({
                status: w,
                username : username
            });
        }
    }
    signupfin(x){
        if (x === "Login") {

            this.setState({
                status: x

            });
        }
    }
    logoutfin(x){
        if (x === "Logout") {

            this.setState({
                status: x

            });
        }
    }

    adminfin(x){
        if (x === "ADMIN") {

            this.setState({
                status: x

            });
        }
    }

    editfin(x,edituserid){
        if (x === "edit") {

            this.setState({
                edituserid: edituserid,
                status: x
            });
        }
    }

    eiei(e){
        console.log("dddd" ,typeof e.currentTarget.dataset.work,e.currentTarget.dataset.work);
        if(e.currentTarget.dataset.work === "Login"){

            this.setState ({
                status:'Login'
            });

        }
        else{
            this.setState ({
                status:'Signup'
            });

        }
    }

    stat(e){
        console.log("dddd" ,typeof e.currentTarget.dataset.work,e.currentTarget.dataset.work);
        if(e.currentTarget.dataset.work === "Online"){

            this.setState ({
                status:'Online'
            });

        }
        else{
            this.setState ({
                status:'ADMIN'
            });

        }
    }
    render(){

        if(this.state.status === 'Online'){
            return(
                <React.Fragment>
                    <Logout log={this.logoutfin} adm={this.stat} username={this.state.username}/>
                    <Lbutton username={this.state.username}/>

                </React.Fragment>
            );
        }

        if (this.state.status ==='Signup'){
            return(
                <React.Fragment>
                    <Button ei={this.eiei}/>
                    <SignupPage sign={this.signupfin}/>

                </React.Fragment>
            );
        }

        if (this.state.status ==='Login'){
            return(
                <React.Fragment>
                    <Button ei={this.eiei}/>
                    <LoginPage stat={this.loginstat}/>

                </React.Fragment>
            );
        }
        if (this.state.status ==='ADMIN'){
            return(
                <React.Fragment>
                    <Logout log={this.logoutfin} adm={this.stat}/>
                    <Admin username={this.state.username} edit={this.editfin}/>

                </React.Fragment>
            );
        }

        if (this.state.status ==='edit'){
            return(
                <React.Fragment>
                    <Logout log={this.logoutfin} adm={this.stat}/>
                    <Edit edituserid={this.state.edituserid} adm={this.adminfin}/>

                </React.Fragment>
            );
        }

        else {
            return (
                <Button ei={this.eiei}/>
            )
        }

    }
}

class Button extends React.Component{
    render(){
        const {ei} = this.props;
        return (
            <div className="ui inverted attached stackable menu">
                <div className="right item">
                    <a className="item" onClick={ei} data-work="Login">
                        LOGIN
                    </a>
                    <a className="item" onClick={ei} data-work="Signup">
                        SIGN UP 
                    </a>
                </div>
            </div>
        );
    }

}

class Logout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            admin: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(evt) {

        evt.preventDefault();
        console.log(evt);
        console.log(evt.target.action);

        fetch(evt.target.action,{
            method: 'POST',
            body: new FormData(evt.target),


        }).then(yy=>yy.json())

            .then(yy => {
                console.log('yy',yy);
                const {logout} = yy;
                if (logout) {
                    //this.setState({eng: 'ok'}, null);// call back function
                    const {log} = this.props;
                    log('Logout');
                }
            })
    }

    componentWillMount(){

        //let aa = this.props.username;
        const aa = new FormData();
        aa.append('username',this.props.username);
        //console.log(aa);
        fetch('http://localhost/account/welcome/takestat',{
            method: 'POST',
            body: aa,
        })
            .then(statt => statt.json())
            .then(statt => {
                //console.log('image',image);

                const {stat} = statt;
                console.log(stat);
                if(stat ==='ADMIN') {
                    this.setState({
                        admin: "ADMIN"
                    });
                }

            });

    }

    render(){
        const {adm} = this.props;

        let $adminbut = null;
        if (this.state.admin === 'ADMIN') {
            $adminbut = (<div className="item">
                <a className="ui inverted button" onClick={adm} data-work="ADMIN">ADMIN</a>
            </div>);
        }
        return (
            <div className="ui inverted menu">
                <div className="item">
                    <a className="ui inverted blue button" onClick={adm} data-work="Online">USER</a>
                </div>
                {$adminbut}
                <div className="right item">
                    <form onSubmit={this.handleSubmit} method="POST"
                          action="http://localhost/account/welcome/logout_cgi">
                        <button className="ui red button">
                            LOGOUT
                        </button>
                    </form>
                </div>
            </div>
        );
    }

}

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            edit : 'FALSE',
            newspace: ''
        };
        this.changestat = this.changestat.bind(this);
        this.updatespace = this.updatespace.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {

        fetch('http://localhost/account/welcome/takeuserlist', {
            method: 'POST',
        })

            .then(userlist => userlist.json())
            .then(userlist => {
                //console.log('image',image);

                const {list} = userlist;
                console.log(list);
                if (list) {
                    this.setState({
                        list: list
                    });
                }
            });
        console.log(this.state.list);

    }

    changestat(e) {
        e.preventDefault();
        const aa = new FormData();
        aa.append('username', e.target.value);
        fetch('http://localhost/account/welcome/changestat', {
            method: 'POST',
            body: aa,
        });
        fetch('http://localhost/account/welcome/takeuserlist', {
            method: 'POST',
        })

            .then(userlist => userlist.json())
            .then(userlist => {
                //console.log('image',image);

                const {list} = userlist;
                console.log(list);
                if (list) {
                    this.setState({
                        list: list
                    });
                }
            });
        console.log(this.state.list);

    }

    updatespace(e) {
        e.preventDefault();
        console.log(e.target.value);
        const {edit} = this.props;
        edit('edit',e.target.value);

    }

    handleChange(evt) {
        this.setState({
            newspace: evt.target.value,
        });

    }

    render(){

        let lists = null;
        if(this.state.list) {
            lists = this.state.list.map(list=>

                <tbody>
                <td className="center aligned">{list.user_id}</td>
                <td className="center aligned">{list.username}</td>
                <td className="center aligned">{list.password}</td>
                <td className="center aligned">{list.user_status}</td>
                <td className="center aligned">{list.Total_Space}</td>
                <td className="center aligned">{list.space_used}</td>
                <td className="center aligned">{list.space_available}</td>
                <td className="center aligned">
                    <button className="ui blue button" onClick={this.changestat} value={list.username} >CHANGE {list.user_status}</button>
                    <button className="ui green button" onClick={this.updatespace} value={list.username} >EDIT SPACE</button>
                </td>
                </tbody>
            );
        }
        return (
            <div className="ui container">

                <h1>Hello Admin {this.props.username}</h1>
                <table className="ui inverted table">
                    <thead>
                    <tr className="center aligned">
                        <th>user_id</th>
                        <th>username</th>
                        <th>password</th>
                        <th>user_status</th>
                        <th>Total_Space</th>
                        <th>space_used</th>
                        <th>space_available</th>
                        <th>EDIT</th>
                    </tr>
                    </thead>
                    {lists}
                </table>
            </div>
        );
    }
}


class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            total: [],
            newspace : ''

        };
        this.updatespace = this.updatespace.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    componentWillMount() {

        const aa = new FormData();
        aa.append('username', this.props.edituserid);
        //console.log(aa);
        fetch('http://localhost/account/welcome/takeeditspace', {
            method: 'POST',
            body: aa,
        })
            .then(response => response.json())
            .then(response => {
                //console.log('image',image);

                const {total} = response;
                console.log(total);
                if (total) {
                    this.setState({
                        total: total
                    });
                }

            });
        console.log(this.state.total);

    }

    updatespace(e) {
        e.preventDefault();

        const aa = new FormData();
        if(this.state.newspace - this.state.total.space_used < 0 ){
            alert('Cannot update space less than space_used ')
        }
        else {
            aa.append('newspace', this.state.newspace);
            aa.append('username', this.props.edituserid);
            fetch(e.target.action, {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                body: aa
            })
                .then(response => response.json())
                .then(response => {
                    const {success} = response;
                    if (success) {
                        alert('success');
                        const {adm} = this.props;
                        adm('ADMIN');
                    }

                });
        }
    }

    handleChange(evt) {
        this.setState({
            newspace: evt.target.value,
        });

    }
    render(){


        return (

            <div className="ui container">
                <h1>Edit Space User '{this.props.edituserid}'</h1>
                <table className="ui inverted table">
                    <thead>
                    <tr className="center aligned">
                        <th>Total_Space</th>
                        <th>Space_used</th>
                        <th>Space_available</th>
                    </tr>
                    </thead>
                    <tbody>
                    <td className="center aligned">{this.state.total.Total_Space}</td>
                    <td className="center aligned">{this.state.total.space_used}</td>
                    <td className="center aligned">{this.state.total.space_available}</td>
                    </tbody>
                </table>
                <form onSubmit={this.updatespace} className="ui form" method="POST" action="http://localhost/account/welcome/updatespace" >

                    <div class="ui input focus">
                        <input type="text" name="newspace" data-test="newspace" value={this.state.newspace}
                               onChange={this.handleChange}/>
                    </div>

                    <input className="ui button" type="submit" value="UPDATE SPACE" data-test="submit"/>
                </form>
            </div>
        );
    }

}



class Lbutton extends React.Component{

    constructor() {
        super();
        this.state = {
            show : [],
            imagePreviewUrl: [],
            selectedFile:'',
            filesize:'',
            URL:'',
            URLdel:'',
            isSubmitted: false,
            files: [],
            imagesPreviewUrls: [],
            total :'',
            space:'',
            amount : ''

        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.fileUploadhandler = this.fileUploadhandler.bind(this);
        this.showimage = this.showimage.bind(this);
        this.delimage = this.delimage.bind(this);


    }
    _handleSubmit(e) {
        //Sumbit handler
        e.preventDefault();
        console.log(this.state.selectedFile);
        const formData = new FormData();
        formData.append('files[]', this.state.selectedFile, this.state.selectedFile.name);
        formData.append('username',this.props.username);
        fetch(e.target.action, {
            method: 'POST',
            body:  formData

        });
    }
    fileUploadhandler(e) {
        e.preventDefault();
        if(this.state.space-this.state.total>0){

            const fd = new FormData();

            fd.append('image', this.state.selectedFile, this.state.selectedFile.name);

            console.log(this.state.selectedFile);
            fd.append('username', this.props.username);

            fetch(e.target.action, {
                method: 'POST',
                body: fd

            })
                .then(response => response.json())

                .then(response => {
                    //console.log('response',response);

                    const {data, total} = response;
                    console.log(data); //show data
                    const array = this.state.show;
                    array.push(data);
                    this.setState({isSubmitted: true}, null);
                    //const index = array.indexOf(newURL);
                    //add (array[index]);
                    if (total) {
                        this.setState({
                            total: parseFloat(Math.round(total * 100) / 100).toFixed(2)
                        }, null);
                    } else {
                        this.setState({
                            total: '0'
                        }, null);
                    }
                    if(this.state.space-this.state.total<0){
                        alert('Your storage is full, Your last file will not save')
                    }

                });
            const aa = new FormData();
            aa.append('username', this.props.username);
            fetch('http://localhost/account/welcome/takeamount', {
                method: 'POST',
                body: aa,
            })
                .then(image => image.json())
                .then(image => {
                    //console.log('image',image);
                    const {amount} = image;

                    this.setState({amount: amount}, null);

                });


        }
        else
        {
            alert('Your storage is full, Your last file will not save');
            /*const aa = new FormData();
            aa.append('username',this.props.username);
            //console.log(aa);
            fetch('http://localhost/account/welcome/takemaxTotal',{
                method: 'POST',
                body: aa,
            })
                .then(image => image.json())
                .then(image => {
                    //console.log('image',image);

                    const {total} = image;
                    console.log(total);
                    if (total) {
                        this.setState({
                            total: parseFloat(Math.round(total * 100) / 100).toFixed(2)
                        });
                    }
                });*/

        }


    }
    _handleImageChange(e) { // multiple file once
        e.preventDefault();
        console.log(e.target.files);
        let files = Array.from(e.target.files);
        this.setState({
            selectedFile : e.target.files
        });
        files.forEach((file) => {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    files: [...this.state.files, file],
                    imagesPreviewUrls: [...this.state.imagesPreviewUrls, reader.result]
                });
            };
            reader.readAsDataURL(file);
        });
        console.log(this.state.selectedFile);
    }

    handleImageChange(e)  { //only one file once
        e.preventDefault();
        console.log(e.target.files[0]);
        let reader = new FileReader();

        let file = e.target.files[0];
        this.setState({
            selectedFile : e.target.files[0],
            filesize : e.target.files[0].size/1000
        });
        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file);
        console.log(this.state.selectedFile);

    }

    componentWillMount() {

        //let aa = this.props.username;
        const aa = new FormData();
        aa.append('username', this.props.username);
        //console.log(aa);
        fetch('http://localhost/account/welcome/takeImage', {
            method: 'POST',
            body: aa,
        })
            .then(image => image.json())
            .then(image => {
                //console.log('image',image);

                const {data, total} = image;
                console.log(total);
                if (data) {
                    this.setState({
                        show: data
                    });
                }
                if (total) {
                    this.setState({
                        total: parseFloat(Math.round(total * 100) / 100).toFixed(2)
                    });
                } else {
                    this.setState({
                        total: '0'
                    });
                }
                console.log(this.state.show);
                console.log(this.state.total);

            });
        fetch('http://localhost/account/welcome/taketotalspace', {
            method: 'POST',
            body: aa,
        })
            .then(image => image.json())
            .then(image => {
                //console.log('image',image);
                const {space} = image;

                this.setState({
                    space : space
                });

            });

        fetch('http://localhost/account/welcome/takeamount', {
            method: 'POST',
            body: aa,
        })
            .then(image => image.json())
            .then(image => {
                //console.log('image',image);
                const {amount} = image;

                this.setState({
                    amount : amount
                });

            })
    }



    showimage(e){
        console.log(e.target.value);
        this.setState({URL: e.target.value},
            () => console.log(this.state.URL));

        console.log(this.state.URL);

    }
    delimage(e){
        this.setState({URLdel:e.target.value}, () => console.log(this.state.URLdel));
        e.preventDefault();


        /*console.log(this.state.URL);
            if(this.state.URL === this.state.URLdel){
                this.setState.URL='ccccc';
                console.log('ccc');
            }
*/

        //console.log(this.state.URL);
        const aa = new FormData();
        aa.append('URLdel',e.target.value);
        aa.append('username',this.props.username);
        fetch('http://localhost/account/welcome/delete',{
            method: 'POST',
            body: aa,


        })
            .then(image => image.json())
            .then(image => {
                //console.log('image',image);

                const {total} = image;
                if(total) {
                    this.setState({
                        total: parseFloat(Math.round(total * 100) / 100).toFixed(2)
                    });
                }
                else{
                    this.setState({
                        total: '0'
                    });
                }
            });
        fetch('http://localhost/account/welcome/takeamount', {
            method: 'POST',
            body: aa,
        })
            .then(image => image.json())
            .then(image => {
                //console.log('image',image);
                const {amount} = image;

                this.setState({amount: amount}, null);

            });


        const array = this.state.show;
        //const index = array.indexOf(e.target.value);
        //delete array[index];
        for(var i=0; i < array.length; i++) {
            if(array[i].file_name === e.target.value)
            {
                array.splice(i,1);
            }
        }
        console.log(this.state.URLdel);

    }

    render(){
        let $over = null;
        let $over2 = null;
        if (this.state.space-this.state.total>15) {
            $over = "ui right floated green inverted statistic";
            $over2 = 'Available'
        }
        else if(15>=(this.state.space-this.state.total) && this.state.space-this.state.total>0){
            $over = "ui right floated yellow inverted statistic";
            $over2 = 'Low Space'
        }
        else if(this.state.space-this.state.total<=0){
            $over = "ui right floated red inverted statistic";
            $over2 = 'Full'
        }

        let showpic = null;
        showpic = this.state.imagesPreviewUrls.map((imagePreviewUrl) =>
            <img key={imagePreviewUrl} alt='previewImg' src={imagePreviewUrl} />);


        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt=""/>);
        }

        let {show} = this.state;
        let items = null;
        if(this.state.isSubmitted && this.state.show) {
            items = this.state.show.map(show=>

                <tbody>
                <td className="center aligned">
                    <img style={{width: 50, height: 50}} src={show.file_name} alt="avatar"/>
                </td>
                <td><a href={show.file_name}> localhost{show.file_name}</a></td>
                <td className="center aligned">{show.file_size} kb</td>
                <td className="center aligned">{show.file_date}</td>
                <td className="center aligned">
                    <button className="ui green button" onClick={this.showimage} value={show.file_name}>Show</button>
                </td>
                <td className="center aligned">
                    <button className="ui red button" onClick={this.delimage} value={show.file_name} >Delete</button>
                </td>

                </tbody>
            );
        }
        else if(this.state.show){
            items = this.state.show.map(show =>

                <tbody>
                <td className="center aligned">
                    <img style={{width: 50, height: 50}} src={show.file_name} alt="avatar"/>
                </td>
                <td> <a href={show.file_name}> localhost{show.file_name}</a></td>
                <td className="center aligned">{show.file_size} kb</td>
                <td className="center aligned">{show.file_date}</td>
                <td className="center aligned">
                    <button className="ui green button" onClick={this.showimage} value={show.file_name}>Show</button>
                </td>
                <td className="center aligned">
                    <button className="ui red button" onClick={this.delimage} value={show.file_name}>Delete</button>
                </td>

                </tbody>
            )
        }
        /*
        <form onSubmit={this._handleSubmit} method="POST" action="http://localhost/account/welcome/uploadImage">
            <input className="upload" type="file" accept='image/*' onChange={this._handleImageChange} multiple/>
            <button type="submit" >Upload Image</button>

        </form>*/
        return (

            <div>
                <div className="ui container">

                    <h1>Hello {this.props.username}</h1>
                    {showpic}
                    {$imagePreview}

                    <form onSubmit={this.fileUploadhandler} method="POST" action="http://localhost/account/welcome/do_upload">
                        <input type ="file" name="file_name" id="file_name" onChange={this.handleImageChange} multiple/>
                        <button type="submit"  className="ui green button">Upload Image</button>
                    </form>

                    <div className="ui inverted  segment">
                        <img className="ui centered image" src={this.state.URL} alt=""/>
                    </div>

                    <div className="ui inverted segment">

                        <div className="ui blue inverted statistic">
                            <div className="value">
                                {this.state.total} kb
                            </div>
                            <div className="label">
                                Total Used
                            </div>
                        </div>

                        <div className="ui center inverted statistic">
                            <div className="value">
                                {this.state.space}
                            </div>
                            <div className="label">
                                Total space
                            </div>
                        </div>
                        <div className={$over}>
                            <div className="value">
                                {parseFloat(Math.round((this.state.space-this.state.total) * 100) / 100).toFixed(2)} kb
                            </div>
                            <div className="label">
                                {$over2}
                            </div>
                        </div>

                        <div className="ui right floated orange inverted statistic">
                            <div className="value">
                                {this.state.amount}
                            </div>
                            <div className="label">
                                Total Files
                            </div>
                        </div>

                    </div>

                    <table className="ui inverted table">
                        <thead>
                        <tr className="center aligned">
                            <th>ImagePreview</th>
                            <th>File_URL</th>
                            <th>SIZE</th>
                            <th>DATE</th>
                            <th>SHOW</th>
                            <th>DELETE</th>
                        </tr>
                        </thead>
                        {items}
                    </table>

                </div>
            </div>
        );
    }

}

class SignupPage extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',

        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({error: ''});
    }

    handleSubmit(evt) {

        evt.preventDefault();
        console.log(evt);
        console.log(evt.target.action);

        fetch(evt.target.action,{
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: new FormData(evt.target)


        }).then(qq=> qq.json())


            .then(qq => {
                console.log(qq);
                const {success,message} = qq;
                console.log(success,message); //show data
                if(success){
                    alert("You are submitting " + this.state.username);
                    const {sign} = this.props;
                    sign('Login');
                }
                else {
                    alert(message);

                }
            });

        if (!this.state.username) {
            return this.setState({error: 'Username is required'});
        }

        if (!this.state.password) {
            return this.setState({error: 'Password is required'});
        }

        return this.setState({error: ''});


    }

    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {


        // NOTE: I use data-attributes for easier E2E testing
        // but you don't need to target those (any css-selector will work)


        return (
            <div className="ui container">
                <form onSubmit={this.handleSubmit} className="ui form" method="POST" action="http://localhost/account/welcome/signup_cgi" >
                    <h1>SIGN UP</h1>
                    {
                        this.state.error &&
                        <h3 data-test="error" onClick={this.dismissError}>
                            <button onClick={this.dismissError}>✖</button>
                            {this.state.error}
                        </h3>
                    }
                    <div className="field">
                        <label>User Name</label>
                        <input type="text" name="username" data-test="username" value={this.state.username}
                               onChange={this.handleUserChange}/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" data-test="password" value={this.state.password}
                               onChange={this.handlePassChange}/>
                    </div>
                    <input className="ui button" type="submit" value="Sign UP" data-test="submit"/>
                </form>

            </div>


        );
    }
}

class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            status: '',

        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({ error: '' });
    }


    handleSubmit(evt) {
        evt.preventDefault();
        console.log(evt);
        console.log(evt.target.action);

        fetch(evt.target.action, {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: new FormData(evt.target)
        }).then(xx => xx.json())

            .then(xx =>  {
                console.log('xx',xx);
                const {success,message} = xx;
                console.log(success,message); //show data
                const {data} =xx;
                //console.log(data.username);

                if(success){
                    this.setState({username: data[0].username});
                    const {stat} = this.props;
                    stat('Online',this.state.username);

                }
                else {
                    console.log('xx');
                    alert('Invalid email and password');
                }
            });

        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }

        return this.setState({ error: '' });
    }

    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {

        return (

            <div className="ui container">

                <h1>LOG IN</h1>
                <form onSubmit={this.handleSubmit} className="ui form" method="POST"
                      action="http://localhost/account/welcome/login_cgi">

                    {
                        this.state.error &&
                        <h3 data-test="error" onClick={this.dismissError}>
                            <button  onClick={this.dismissError}>✖</button>
                            {this.state.error}
                        </h3>
                    }
                    <div className="field">
                        <label>User Name</label>
                        <input type="text" name="username" data-test="username" value={this.state.username}
                               onChange={this.handleUserChange}/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" data-test="password" value={this.state.password}
                               onChange={this.handlePassChange}/>
                    </div>

                    <input className="ui button" type="submit" value="Log In" data-test="submit"/>
                </form>
            </div>

        );
    }

}


class App extends React.Component {


    render() {



        return (
            <UIcontent/>
        );



    }

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);


