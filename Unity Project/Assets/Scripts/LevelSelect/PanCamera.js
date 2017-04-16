﻿#pragma strict
public var lastMousePos: Vector3;
public var currentMousePos: Vector3;
public var panSpeed: float;

function Start () 
{
	transform.position.x = PlayerPrefs.GetFloat("cameraPos");
}

function Update () 
{
	if(Input.GetKey(KeyCode.Mouse0))
	{
		currentMousePos = Input.mousePosition;
		if(currentMousePos.x < lastMousePos.x)
		{
			transform.position.x += panSpeed * Time.deltaTime;
		} else if (currentMousePos.x > lastMousePos.x)
		{
			transform.position.x -= panSpeed * Time.deltaTime;
		}
		lastMousePos = Input.mousePosition;
	}

	if(Input.GetKeyUp(KeyCode.Mouse0))
	{
		PlayerPrefs.SetFloat("cameraPos", transform.position.x);
	}

}