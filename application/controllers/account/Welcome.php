<?php

class Welcome extends CI_Controller {

    /*public function index()
    {
        $data = ['test1'=> $this->load->view('Register',NULL,TRUE)];

        $this->load->view("first_view",$data);
    }*/
    public function index()
    {
        $this->load->view("/account/Register");
    }

    public function form_validation()
    {
        //echo 'OK';
        $this->load->library('form_validation');
        $this->form_validation->set_rules("email", "Email", 'required');
        $this->form_validation->set_rules("password", "Password", 'required');
        if ($this->form_validation->run())
        {
            //true
            $this->load->model("Main_model");
            $data = array(
                "email" =>$this->input->post("email"),
                "password" =>$this->input->post("password")
            );
            $this->Main_model->insert_data($data);

            redirect(base_url() . "inserted");

        }
        else
        {
            //false
            $this->index();
        }

    }

    public function inserted()
    {
        $this->index();

    }
    public function login()
    {
        $data['title'] = 'Login Form';
        $this->load->view("login",$data);
    }

    function login_validation()
    {
        $this->load->library('form_validation');
        $this->form_validation->set_rules("email", "Email", 'required');
        $this->form_validation->set_rules("password", "Password", 'required');
        if($this->form_validation->run())
        {
            //true
            $email = $this->input->post('email');
            $password = $this->input->post('password');
            //model function
            $this->load->model('Main_model');
            if($this->Main_model->can_login($email, $password))
            {
                $session_data = array(
                    'email'  => $email,
                    'password'  => $password
                );
                $this->session->set_userdata($session_data);
                redirect(base_url() . 'enter');
            }
            else
            {
                $this->session->set_flashdata('error', 'Invalid Email and Password');
                redirect(base_url() . 'login');
            }
        }
        else
        {
            //false
            $this->login();
        }
    }
    function enter(){
        if($this->session->userdata('username') != '')
        {
            echo '<h2>Welcome - '.$this->session->userdata('username').'</h2>';
            echo '<label><a href="'.base_url

                ().'logout">Logout</a></label>';
        }
        else
        {
            redirect(base_url() . 'login');
        }
    }
    function logout()
    {
        $this->session->unset_userdata('username');
        redirect(base_url() . 'login');
    }




    public function forgotpass()
    {


        $data['title'] = 'Forgot Password';

        $this->load->library('form_validation');

        $this->form_validation->set_rules('email', 'Email', 'required');
        $this->form_validation->set_rules('newpass', 'new password', 'required');
        $this->form_validation->set_rules('passconf', 'confirm password', 'required|matches[newpass]');


        if($this->form_validation->run() == false) {

            $this->load->view('forgotpass', $data);
        }
        else {
            $email = $this->input->post('email');


            $newpass = $this->input->post('newpass');
            $this->load->model('Main_model');

            $this->Main_model->update_user($email, array('password' => $newpass));

            echo "ok";
            redirect(base_url() . 'login');
        }
    }

    public function password_check($email)
    {
        $this->load->model('Main_model');
        $email = $this->session->userdata('email');
        $user = $this->Main_model->get_user($email);

        if($user->email !== $email) {
            $this->form_validation->set_message('email_check', 'The {field} does not match');
            return false;
        }

        return true;
    }


    public function logout_cgi()
    {
        $ei = array(

            "logout" => FALSE,

        );

        $this->session->unset_userdata('isLogged',FALSE);
        $this->session->set_userdata('username',NULL);
        $ei['logout'] = TRUE;
        $ei = json_encode($ei);
        $this->output
            ->set_content_type('application/json')
            ->set_output($ei);


    }


    public function login_cgi()
    {
        $eieiei = array(
            "success"   => FALSE,
            "message"   => "",
            "data"      => [],


        );
        $isLogged = null;

        $this->load->library('form_validation');
        $this->form_validation->set_rules("username", "Username", 'required');
        $this->form_validation->set_rules("password", "Password", 'required');
        if($this->form_validation->run())
        {
            $this->load->model('Main_model');
            //true
            $username = $this->input->post('username');
            $password = $this->input->post('password');
            //model function

            if($frong = $this->Main_model->can_login($username, $password))
            {
                $session_data = array(
                    'username'  => $username,
                    'password'  => $password
                );
                $this->session->set_userdata($session_data);

                $this->session->set_userdata('isLogged',TRUE);
                $this->session->set_userdata('username',$username);
                $isLogged =$this->session->userdata('isLogged');
                $username = $this->session->userdata('username');
                $eieiei['data']= $frong;
                $eieiei['success'] = 'Online';
                //redirect(base_url() . 'enter');

            }
            else
            {
                $eieiei['message'] = 'Invalid Email and Password';
                //$this->session->set_flashdata('error', 'Invalid Email and Password');


            }
        }
        else
        {
            $eieiei["message"] = "try again";
        }
        $eieiei = json_encode($eieiei);
        $this->output
            ->set_content_type('application/json')
            ->set_output($eieiei);

    }

    public function checkstatus()
    {
        $eieiei = array(
            "success"   => FALSE,
            "message"   => "",
            "data"      => '',
        );

        $isLogged =$this->session->userdata('isLogged');
        $username = $this->session->userdata('username');
        if ($isLogged){
            $eieiei['success'] = 'Online';
            $eieiei['data'] = $username;
        }
        $eieiei = json_encode($eieiei);
        $this->output
            ->set_content_type('application/json')
            ->set_output($eieiei);

    }

    public function signup_cgi()
    {
        $eiei = array(
            "success"   => FALSE,
            "message"   => "",
            "data"      => [],


        );

        $this->load->library('form_validation');
        $this->form_validation->set_rules("username", "Username",'required' );
        $this->form_validation->set_rules("password", "Password",'required');
        if ($this->form_validation->run())
        {

            //true
            $this->load->model("Main_model");
            $username = $this->input->post("username");
            $password = $this->input->post("password");

            if($this->Main_model->can_signup($username)) {
                $this->Main_model->insert_data($username,$password);
                $eiei['success'] = TRUE;
            }
            else
            {
                $eiei['success'] = FALSE;
                $eiei['message'] = 'The username has already exits';
            }



        }
        else{
            $eiei["message"] = "try again";
        }
        $eieiei = json_encode($eiei);
        $this->output
            ->set_content_type('application/json')
            ->set_output($eieiei);
    }

    public function gmm()
    {
        $this->load->view("gmm.html");
    }


    public function do_upload()
    {
        $new = array(
            'data' => [],
            'total' =>''
        );

        $error  = [];

        $error['FILE']  = $_FILES;
        $error['GET']   = $_GET;
        $error['POST']  = $_POST;
        $error['R']  = $_REQUEST;

        $username = $this->input->post('username');

        $config['upload_path'] = $_SERVER['DOCUMENT_ROOT'].'/uploads/';
        $config['allowed_types'] = 'gif|jpg|jpeg|png';
        $config['max_size'] = 100;
        $config['max_width'] = 1024;
        $config['max_height'] = 768;
        $config['encrypt_name'] = TRUE;
        $this->load->library('upload', $config);
        $this->load->model("Main_model");
        if (!$this->upload->do_upload('image')) {
            $error['error']  = $this->upload->display_errors();

            $error = json_encode($error);

            $this->output
                ->set_content_type('application/json')
                ->set_output($error);
        } else {
            $data = array('upload_data' => $this->upload->data());

            $okay = $data['upload_data']['full_path'];
            //var_dump($data);
            $base = str_replace("/var/www/html", "", $okay);
            $size = $data['upload_data']['file_size'];
            $this->load->model("Main_model");


            $new['data'] =  $this->Main_model->upload_data($username,$base,$size);
            //var_dump($new['data']);
            $new['total'] = $this->Main_model->takeTotal($username);

            $new = json_encode($new);
            $this->output
                ->set_content_type('application/json')
                ->set_output($new);

        }

    }

    public function uploadImage() {
        $pic = array(
            'total' => ''
        );
        $data = [];

        $error  = [];

        $error['FILE']  = $_FILES;
        $error['GET']   = $_GET;
        $error['POST']  = $_POST;
        $error['R']  = $_REQUEST;

        $username = $this->input->post('username');
        $count = count($_FILES['file']['name']);

        for($i=0;$i<$count;$i++){

            if(!empty($_FILES['files']['name'][$i])){

                $_FILES['file']['name'] = $_FILES['files']['name'][$i];
                $_FILES['file']['type'] = $_FILES['files']['type'][$i];
                $_FILES['file']['tmp_name'] = $_FILES['files']['tmp_name'][$i];
                $_FILES['file']['error'] = $_FILES['files']['error'][$i];
                $_FILES['file']['size'] = $_FILES['files']['size'][$i];


                $config['upload_path'] = $_SERVER['DOCUMENT_ROOT'].'/uploads/';
                $config['allowed_types'] = 'gif|jpg|jpeg|png';
                $config['max_size'] = 100;
                $config['max_width'] = 1024;
                $config['max_height'] = 768;
                $config['encrypt_name'] = TRUE;
                $this->load->library('upload', $config);
                $this->load->model("Main_model");
                if($this->upload->do_upload('file')){
                    $uploadData = $this->upload->data();
                    $filename = $uploadData['file_name'];
                    $data['totalFiles'][] = $filename;
                }
            }
        }


    }

    public function takeImage(){
        $pic = array(
                'data' => [],
                'total' => ''
        );


        $this->load->model("Main_model");


        $username = $this->input->post('username');
        //var_dump($username);

        $pic['total'] = $this->Main_model->takemaxTotal($username);
        $pic['data'] = $this->Main_model->takeImage($username);

        $pic = json_encode($pic);
        $this->output
            ->set_content_type('application/json')
            ->set_output($pic);

    }

    public function takemaxTotal(){
        $pic = array(
                'total' => ''
        );


        $this->load->model("Main_model");

        $username = $this->input->post('username');
        //var_dump($username);

        $pic['total'] = $this->Main_model->takemaxTotal($username);

        $pic = json_encode($pic);
        $this->output
            ->set_content_type('application/json')
            ->set_output($pic);

    }

    public function takestat(){
        $pic = array(
            'stat' => ''
        );


        $this->load->model("Main_model");

        $username = $this->input->post('username');
        //var_dump($username);

        $pic['stat'] = $this->Main_model->takestat($username);

        $pic = json_encode($pic);
        $this->output
            ->set_content_type('application/json')
            ->set_output($pic);

    }
    public function taketotalspace(){
        $pic = array(
            'space' => ''
        );

        $this->load->model("Main_model");

        $username = $this->input->post('username');
        //var_dump($username);

        $pic['space'] = $this->Main_model->taketotalspace($username);

        $pic = json_encode($pic);
        $this->output
            ->set_content_type('application/json')
            ->set_output($pic);

    }

    public function takeamount(){
        $pic = array(
            'amount' => ''
        );

        $this->load->model("Main_model");

        $username = $this->input->post('username');
        //var_dump($username);

        $pic['amount'] = $this->Main_model->takeamount($username);

        $pic = json_encode($pic);
        $this->output
            ->set_content_type('application/json')
            ->set_output($pic);

    }

    public function takeuserlist(){
        $pic = array(
            'list' => [],

        );
        $this->load->model("Main_model");
        $pic['list'] = $this->Main_model->takeuserlist();
        $pic = json_encode($pic);
        $this->output
            ->set_content_type('application/json')
            ->set_output($pic);

    }

    public function changestat(){
        $newstat = array(
            'newstat' => '',

        );

        $this->load->model("Main_model");
        $username = $this->input->post('username');

        $newstat['newstat'] = $this->Main_model->takenewstat($username);
        $newstat = json_encode($newstat);
        $this->output
            ->set_content_type('application/json')
            ->set_output($newstat);

    }
    public function delete()
    {
        $pic = array(
            'total' => ''
        );
        $del = $this->input->post('URLdel');
        $this->load->model("Main_model");
        $username = $this->input->post('username');
        $this->Main_model->delImage($del);
        $pic['total'] = $this->Main_model->takeTotal($username);
        $pic = json_encode($pic);
        $this->output
            ->set_content_type('application/json')
            ->set_output($pic);
    }

    public function updatespace()
    {
        $response = array(
            'success' => ''
        );
        $username = $this->input->post('username');
       $space = $this->input->post('newspace');
        $this->load->model("Main_model");
        $response['success'] = $this->Main_model->updatespace($username,$space);
        $response = json_encode($response);
        $this->output
            ->set_content_type('application/json')
            ->set_output($response);
    }

    public function takeeditspace()
    {
        $space = array(
            'total' => [],

        );

        $this->load->model("Main_model");
        $username = $this->input->post('username');
        $space['total'] = $this->Main_model->takeeditspace($username);
        $space = json_encode($space);
        $this->output
            ->set_content_type('application/json')
            ->set_output($space);

    }


}

