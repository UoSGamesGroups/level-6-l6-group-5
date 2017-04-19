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
public var releaseToGoDownImage: GameObject;
public var started: float;
public var anim: Animator;
public var endTime: float;
public var end: boolean;
public var waterBreakEffectLeft: ParticleSystem;
public var waterBreakEffectRight: ParticleSystem;
public var waterBreakEffectBack: ParticleSystem;
public var released: boolean;
public var holdStarted: boolean;

function Start()
{
	//Get UI start pos for % of progress
	startPosHealthUI = healthObj.transform.position;
	bossUIObjPos = bossUIObj.transform.position;
	distanceUI = startPosHealthUI.x - bossUIObjPos.x;
	//scale speed
	speed = speed + (speedMultiplier * PlayerPrefs.GetInt("currentLevel"));
	//scale end distance
	endDistance = 130 + (distanceMultiplier * PlayerPrefs.GetInt("currentLevel"));
	
	currentLevel = PlayerPrefs.GetInt("currentLevel");

	Analytic("Level " + currentLevel.ToString() + " Exploration", true, "Loaded");
	//create boss for the end
	//var bossPos: Vector3;
	//bossPos.x = endDistance + 5;
	//var boss: GameObject = Instantiate(boss,bossPos,Quaternion.Euler(0,0,0));
	//boss.GetComponent(MoveBoss).player = this.gameObject;
	Time.timeScale = 0;

	started = 1000000;
}

function Update () 
{
	if(Input.GetMouseButtonUp(0))
	{
		released = true;
	}

	if(Input.GetKeyDown(KeyCode.Mouse0) && !holdStarted)
	{
		Time.timeScale = 1;
		tapToStartImage.SetActive(false);
		started = Time.time + 1;
		holdStarted = true;
	}

	if(PlayerPrefs.GetInt("currentLevel") == 1)
	{
		if(Time.time > started && !released)
		{
			releaseToGoDownImage.SetActive(true);
			Time.timeScale = 0;
		}

		if(released)
		{
			releaseToGoDownImage.SetActive(false);
			Time.timeScale = 1;
		}
	}
	else
	{
			releaseToGoDownImage.SetActive(false);
	}

	//Move UI to show progress
	percentageCompleted = (currentDistance / endDistance);
	healthObj.transform.position.x = startPosHealthUI.x - (distanceUI * percentageCompleted);
	//show health
	healthUI.fillAmount = health/100;

	if(health <= 0)
	{
		Analytic("Level " + currentLevel.ToString() + " Exploration", true, "Died");
		Application.LoadLevel("LevelSelect");
	}

	currentDistance = transform.position.x;

	if(currentDistance >= endDistance)
	{
		waterBreakEffectLeft.Stop();
		waterBreakEffectRight.Stop();
		waterBreakEffectBack.Stop();

		Analytic("Level " + currentLevel.ToString() + " Exploration", true, "Won"); 
		Debug.Log("explore finished with - health: " + health + " endDistance: " + endDistance);
		anim.enabled = true;
		anim.SetBool("End", true);
		anim.applyRootMotion = false;

		if(!end)
			endTime = Time.time + 1.5;

		end = true;
		
		if(endTime <= Time.time)
		{
			PlayerPrefs.SetFloat("healthAtEndOfExplore", health);
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
	if(transform.position.z < minZ)
	{
		if(yAngle > 45)
		transform.Rotate(0, (-Time.deltaTime*rotateUpSpeed),0);

		transform.position.z = minZ;
	}

	//if boat at top of screen
	if(transform.position.z > maxZ)
	{
		if(yAngle < 130)
			transform.Rotate(0,(Time.deltaTime*rotateDownSpeed),0);

		transform.position.z = maxZ;
	}
}

function Analytic(name: String, num: Object, eventName: String)
{
	//Test for analytics. Might change. 
	var params = new System.Collections.Generic.Dictionary.<System.String,System.Object>();
	params.Add(eventName, num);
	var returnVal = Analytics.Analytics.CustomEvent(name, params);
	Debug.Log(returnVal);
}
