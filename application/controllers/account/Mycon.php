<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mycon extends CI_Controller {

    protected $data = array();

    public  function __construct()
    {
        parent::__construct();
    }

    public  function layout()
    {
	    $this->accouunt['template'] = $this->load->view('account/template',$this->data, TRUE);
        $this->accouunt['page'] = $this->load->view($this->page,$this->data, TRUE);
        $this->load->view('account/main', $this->account);

    }
    public function index()
    {
        $this->load->view('Register');
        $this->layout();
    }

}
