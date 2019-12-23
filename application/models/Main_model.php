<?php

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main_model extends CI_Model
{


    public function insert_data($username,$password)
    {
        $data = array(
            'username' => $username,
            'password' => $password

        );
        $this->db->insert("user_list", $data);
        $afftectedRows=$this->db->affected_rows();

        if($afftectedRows == 1 ) {

            $eiei['return'] = '1';

        }
        else{
            return 0;
        }


    }
    public function can_login($username,$password)
    {
        $this->db->select("*");
        $this->db->where("username", $username);
        $this->db->where("password", $password);
        $query = $this->db->get('user_list');

        if($query->num_rows() > 0)
        {
            return $query->result_array();
        }
        else
        {
            return false;
        }
    }

    public function can_signup($username)
    {
        $this->db->select("*");
        $this->db->where("username", $username);
        $query = $this->db->get('user_list');

        if($query->num_rows() > 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    public function get_user($username)
    {

        $this->db->where("username", $username);
        $query = $this->db->get('user_list');

        if($query->num_rows() > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public function update_user($email, $password)
    {
        $this->db->where('email', $email);
        $this->db->update('user_list', $password);
    }

    function upload_data($username, $base,$size)
    {

        $this->db->select("user_id");
        $this->db->where("username", $username);
        $query = $this->db->get('user_list');
        $row = $query->row();
        $now = date('Y-m-d H:i:s');
        $data = array(
            'file_name' => $base,
            'user_id' => $row->user_id,
            'file_size' => $size ,
            'file_date' => $now

        );
        $this->db->insert('file_upload', $data);

        return  $data = array(
            'file_name' => $base,
            'file_size' => $size ,
            'file_date' => $now

        );

    }

    public function takeImage($username)
    {
        $this->db->select("user_id");
        $this->db->where("username", $username);
        $aa = $this->db->get('user_list');
        $qq = $aa->row();


        $this->db->select("file_name,file_size,file_date");
        $this->db->where("user_id", $qq->user_id);
        $query = $this->db->get('file_upload');


        if($query->num_rows() > 0)
        {

            return $query->result_array();
        }
        else
        {
            return false;
        }
    }

    public function takeTotal($username)
    {
        $this->db->select("user_id");
        $this->db->where("username", $username);
        $aa = $this->db->get('user_list');
        $qq = $aa->row();

        $this->db->select_sum('file_size');
        $this->db->where("user_id", $qq->user_id);
        $query = $this->db->get('file_upload');


        if($query->num_rows() > 0)
        {
            $result = $query->row();
            $this->db->set('space_used', $result->file_size);
            $this->db->where("user_id", $qq->user_id);
            $this->db->update('user_list');
            return $result->file_size;

        }
        else
        {
            return false;
        }
    }
    public function takemaxTotal($username)
    {
        $this->db->select("user_id,Total_Space");
        $this->db->where("username", $username);
        $aa = $this->db->get('user_list');
        $qq = $aa->row();

        $this->db->select_sum('file_size');
        $this->db->where("user_id", $qq->user_id);
        $query = $this->db->get('file_upload');


        if($query->num_rows() > 0)
        {
            $result = $query->row();
            if($result->file_size > $qq->Total_Space){
                $this->db->select_max('file_id');
                $this->db->where("user_id", $qq->user_id);
                $queryy = $this->db->get('file_upload');
                $max = $queryy->row();

                $this->db->where("file_id", $max->file_id);
                $this->db->delete('file_upload');

                $this->db->select_sum('file_size');
                $this->db->where("user_id", $qq->user_id);
                $query2 = $this->db->get('file_upload');
                $result2 = $query2->row();

                $this->db->set('space_used', $result2->file_size);
                $this->db->where("user_id", $qq->user_id);
                $this->db->update('user_list');
                return $result2->file_size;

            }
            else{
                $this->db->set('space_used', $result->file_size);
                $this->db->where("user_id", $qq->user_id);
                $this->db->update('user_list');
                return $result->file_size;
            }
        }
        else
        {
            return false;
        }
    }

    public function takestat($username){
        $this->db->select("user_status");
        $this->db->where("username", $username);
        $aa = $this->db->get('user_list');
        $qq = $aa->row();
        return $qq->user_status;
    }

    public function taketotalspace($username){
        $this->db->select("Total_Space");
        $this->db->where("username", $username);
        $aa = $this->db->get('user_list');
        $qq = $aa->row();
        return $qq->Total_Space;
    }

    public function takeamount($username){
        $this->db->select("user_id,Total_Space");
        $this->db->where("username", $username);
        $aa = $this->db->get('user_list');
        $ss = $aa->row();

        $this->db->select("*");
        $this->db->where("user_id", $ss->user_id);
        $aa = $this->db->get('file_upload');
        $qq = $aa->num_rows();

        return $qq;
    }

    public function takeuserlist()
    {
        $this->db->select("user_id,username,password,user_status,space_used,Total_Space,space_available");
        $query = $this->db->get('user_list');

        if($query->num_rows() > 0)
        {

            return $query->result_array();
        }
        else
        {
            return false;
        }
    }

    public function delImage($del)
    {
        $this->db->where('file_name', $del);
        $this->db->delete('file_upload');
        return $del;


    }

    public function takenewstat($username)
    {
        $this->db->select("user_status");
        $this->db->where("username", $username);
        $aa = $this->db->get('user_list');
        $qq = $aa->row();

        if($qq->user_status == 'ADMIN')
        {
            $this->db->set('user_status', 'USER');
            $this->db->where("username", $username);
            $this->db->update('user_list');


        }
        else if($qq->user_status == 'USER')
        {
            $this->db->set('user_status', 'ADMIN');
            $this->db->where("username", $username);
            $this->db->update('user_list');
        }
    }

    public function updatespace($username,$space)
    {

        $this->db->set('Total_space', $space);
        $this->db->where("username", $username);
        $this->db->update('user_list');
        return TRUE;

    }

    public function takeeditspace($username)
    {
        $this->db->select("Total_Space,space_used,space_available");
        $this->db->where("username", $username);
        $aa = $this->db->get('user_list');
        $query = $aa->row();


        return $query;

    }

}
