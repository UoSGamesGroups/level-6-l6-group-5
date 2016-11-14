#pragma strict

public var button: GameObject;
public var cameras: GameObject[];
public var boats: GameObject[];
public var mainCamera: GameObject;
public var controller: GameObject;

function Start()
{
	cameras = GameObject.FindGameObjectsWithTag("BoatCamera");
	boats = GameObject.FindGameObjectsWithTag("Boat");
	

	for(var i = 0; i < cameras.Length; i++)
	{
		cameras[i].SetActive(false);
	}
	
	button.SetActive(false);
}

function clicked () 
{
	mainCamera.SetActive(true);

	for(var i = 0; i < cameras.Length; i++)
	{
		cameras[i].SetActive(false);
	}
	
	for(var j = 0; j < boats.Length; j++)
	{
		boats[j].GetComponent(BoxCollider).enabled = true;
	}
	button.SetActive(false);
	controller.GetComponent(Controller).selectedBoat = false;
	
}