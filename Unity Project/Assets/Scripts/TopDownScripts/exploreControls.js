#pragma strict
import UnityEngine.UI;

private var swipeStartPos: Vector2;
private var swipeEndPos: Vector2;
private var swipeVector: Vector2;
public var speed: float;
public var yAngle: float;
public var turnSpeed: float;
public var health: float;
public var healthUI: Image;
public var currentLevel: int;
public var endDistance: float;
public var currentDistance: float;
public var maxZ: float;
public var minZ: float;
public var distanceMultiplier: float;
public var speedMultiplier: float;
private var percentageCompleted: float;
public var healthObj: GameObject;
public var bossUIObj: GameObject;
public var boss: GameObject;
private var bossUIObjPos: Vector3;
private var startPosHealthUI: Vector3;
private var distanceUI: float;
public var rotateUpSpeed: float;
public var rotateDownSpeed: float;
public var tapToStartImage: GameObject;
public var anim: Animator;
public var endTime: float;
public var end: boolean;

function Start()
{
	//GEt UI start pos for % of progress
	startPosHealthUI = healthObj.transform.position;
	bossUIObjPos = bossUIObj.transform.position;
	distanceUI = startPosHealthUI.x - bossUIObjPos.x;
	//scale speed
	speed = speed + (speedMultiplier * PlayerPrefs.GetInt("currentLevel"));
	//scale end distance
	endDistance = 140 + (distanceMultiplier * PlayerPrefs.GetInt("currentLevel"));
	
	currentLevel = PlayerPrefs.GetInt("currentLevel");

	Analytic("Level " + currentLevel.ToString() + " Exploration", true, "Loaded");
	//create boss for the end
	var bossPos: Vector3;
	bossPos.x = endDistance + 5;
	var boss: GameObject = Instantiate(boss,bossPos,Quaternion.Euler(0,0,0));
	boss.GetComponent(MoveBoss).player = this.gameObject;
	Time.timeScale = 0;
}

function Update () 
{
	//TAP TO START
	if(Input.GetKey(KeyCode.Mouse0))
	{
	Time.timeScale = 1;
	tapToStartImage.SetActive(false);
	}
	//Move UI to show progress
	percentageCompleted = (currentDistance / endDistance);
	healthObj.transform.position.x = startPosHealthUI.x - (distanceUI * percentageCompleted);
	//show health
	healthUI.fillAmount = health/100;

	if(health <= 0)
	{
		Analytic("Level " + currentLevel.ToString() + " Exploration", true, "Died");
		Application.LoadLevel("runner");
	}

	currentDistance = transform.position.x;

	if(currentDistance >= endDistance)
	{
		Analytic("Level " + currentLevel.ToString() + " Exploration", true, "Won"); 
		Debug.Log("explore finished with - health: " + health + " endDistance: " + endDistance);
		anim.SetBool("End", true);
		anim.applyRootMotion = false;

		if(!end)
			endTime = Time.time + 1.5;

		end = true;
		
		if(endTime <= Time.time)
		{
			Application.LoadLevel("Boss");
		}
	}

	if(Input.GetKey(KeyCode.Mouse0))
	{
		if(transform.position.z < maxZ)
		{
			if(yAngle > 45)
			transform.Rotate(0, (-Time.deltaTime*rotateUpSpeed),0);
		}
	} else {
		if(transform.position.z > minZ)
		{
			if(yAngle < 130)
			transform.Rotate(0,(Time.deltaTime*rotateDownSpeed),0);
		}
	}

	yAngle = transform.localEulerAngles.y;
	//moveBoat forwards
	if(!end)
		transform.position += (transform.forward * speed) * Time.deltaTime;

	// if boat at bottom of screen
	if(transform.position.z < minZ){
		if(yAngle > 45)
		transform.Rotate(0, (-Time.deltaTime*rotateUpSpeed),0);

		transform.position.z = minZ;
		}
	//if boat at top of screen
	if(transform.position.z > maxZ){
		if(yAngle < 130)
		transform.Rotate(0,(Time.deltaTime*rotateDownSpeed),0);

		transform.position.z = maxZ;
		}
	


/*  ///////////OLD SWIPE TO MOVE CONTROLS///////////////////
	//if mouse down or touch set start pos
	if(Input.GetKeyDown (KeyCode.Mouse0))
	{
		swipeStartPos.x = Input.mousePosition.x;
		swipeStartPos.y = Input.mousePosition.y;
	}
	//if mouse down or touch set end pos
	if(Input.GetKeyUp (KeyCode.Mouse0))
	{
		swipeEndPos.x = Input.mousePosition.x;
		swipeEndPos.y = Input.mousePosition.y;
		//Get direction of swipe
		swipeVector = swipeStartPos - swipeEndPos;

		if (swipeVector.y > 100)
		{
			Debug.Log("Swipe Down");
			TurnShipDown();
		} 
		else if(swipeVector.y < -100)
		{
			Debug.Log("Swipe Up");
			TurnShipUp();
		}
	}

	if(yAngle < 90)
	{
		transform.Rotate(0,Time.deltaTime * turnSpeed,0);
	} 
	else if(yAngle > 90)
	{
		transform.Rotate(0,-Time.deltaTime * turnSpeed,0);
	}

	*/


}
/*  ///////////OLD SWIPE TO MOVE CONTROLS///////////////////
function TurnShipUp()
{
	if(transform.position.z < maxZ)
	{
		if(yAngle > 45)
		transform.Rotate(0,-10,0);
	}
}



function TurnShipDown()
{
	if(transform.position.z > minZ)
	{
		if(yAngle < 130)
		transform.Rotate(0,10,0);
	}
}
*/
function Analytic(name: String, num: Object, eventName: String)
{
	//Test for analytics. Might change. 
	var params = new System.Collections.Generic.Dictionary.<System.String,System.Object>();
	params.Add(eventName, num);
	var returnVal = Analytics.Analytics.CustomEvent(name, params);
	Debug.Log(returnVal);
}
