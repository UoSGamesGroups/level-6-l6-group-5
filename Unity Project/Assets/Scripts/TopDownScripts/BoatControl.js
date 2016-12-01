#pragma strict
import UnityEngine.UI;
public var pos: Vector3;
public var marker: GameObject;
public var distance: float = 4.5;
public var speed: float = 4.5;
public var travelTo: GameObject;
public var health: float;
public var mousePos: Vector3;
public var started: boolean;
public var healthImage: Image;
public var maxHealth: int;


function Start () {

}

function Update () 
{
	healthImage.fillAmount = health/100;

	var step = speed * Time.deltaTime;

//if click and there is no current marker
	if (Input.GetKeyDown(KeyCode.Mouse0) && travelTo == null )
	{
//get pos of mouse
		mousePos.x = (Input.mousePosition.x);
		mousePos.y = (Input.mousePosition.y);
		mousePos.z = (distance);
//convert to world point
		pos = Camera.main.ScreenToWorldPoint (mousePos);
//make marker obj at this point
		Instantiate (marker,pos,transform.rotation);
//get the marker gameObject
		travelTo = gameObject.FindGameObjectWithTag("marker");
	}
//if click and marker already exists, delete it
	else if (Input.GetKeyDown(KeyCode.Mouse0) && travelTo != null )
	{
//get pos of mouse
		mousePos.x = (Input.mousePosition.x);
		mousePos.y = (Input.mousePosition.y);
		mousePos.z = (distance);
//convert to world point
		pos = Camera.main.ScreenToWorldPoint (mousePos);
//update Marker
		travelTo.transform.position = pos;
	}
// if there is a marker travel to it
	if (travelTo != null)
	{
		var damping: int = 2; //speed of turn
		var lookPos = travelTo.transform.position - transform.position; //gets pos of rotation needed
		lookPos.y = 0;
		var rotation = Quaternion.LookRotation(lookPos); //calculates rotation
		transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping); // rotates boat to face marker
//Old control method
		transform.position += transform.forward * Time.deltaTime;//makes boat move forwards
		//transform.position = Vector3.MoveTowards(transform.position, travelTo.transform.position, step); // moves boat towards marker


	}



	if (health <= 0)
	Application.LoadLevel(Application.loadedLevel);



}

