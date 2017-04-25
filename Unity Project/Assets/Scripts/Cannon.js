#pragma strict

public var cannon: GameObject;
public var enemy: GameObject; 
public var clicked: boolean; 
public var touchStart: Vector3;
public var touchEnd: Vector3;
public var touchTrav: Vector3;
public var valid: boolean; 
public var ballPos: Vector3;
public var ball: GameObject; 
public var force: Vector3;
public var forceMinMax: Vector2;
public var forceMinMaxX: Vector2;
public var once: boolean; 
public var reloadTime: float;
public var finishReload: float;
public var reloadImage: GameObject;
public var reloaded: boolean;
public var xForce: float;
public var reloadPercent: float;
public var time: float;
public var timeLeft: float;
public var acuracyLevel: int;
public var acuracy: Vector2;
public var params = new System.Collections.Generic.Dictionary.<System.String, System.Object>();
static var shotCounter: int;
static var shotsHit: int;
static var shotsMissed: int;
public var selected: boolean;
public var outline: Material;
public var cannonController: GameObject;
public var explosionParticles: GameObject;
public var type: Type;
public var material: Material;
public var anim: Animator;
public var hasAmmo: boolean;
public var screenWidth: float;
public var audioSource: AudioSource;
public var cannonSound: AudioClip;
public var percentageMinMax: Vector2;

enum Type {Normal, Fire, Heavy, Slow}

function Start () 
{
	shotCounter = 0;
	shotsHit = 0;
	shotsMissed = 0;

	//ballPos = new Vector3(transform.position.x  + 0.65, transform.position.y + 1.44, transform.position.z + 2.29);


	enemy = GameObject.FindGameObjectWithTag("Enemy");
	acuracyLevel = PlayerPrefs.GetInt("Cannon");
	
	reloadTime = 1.25 - (PlayerPrefs.GetInt("Reload") / 10);

	screenWidth = Screen.height;

	percentageMinMax.x = (screenWidth / 10) * 5;
	percentageMinMax.y = (screenWidth / 10) * 6;
}

function Update () 
{
	if(!selected)
	{
		anim.SetBool("Selected", false);
	}
	else
	{
		anim.SetBool("Selected", true);
	}

	if (Input.touchCount > 0)
	var touch: Touch = Input.GetTouch(0);
	
	switch(touch.phase)
	{
	
	case TouchPhase.Began: 
							touchStart = touch.position;
							once = true;
							break;
	case TouchPhase.Moved:
							if(clicked) 
								valid = true;
							else
								valid = false;
							break; 
	case TouchPhase.Ended:  
							if(valid)
							{
								touchEnd = touch.position;
								touchTrav.y = touchEnd.y - touchStart.y;
								touchTrav.x =  touchEnd.x - touchStart.x;
								Mathf.Max(touchTrav.y, 0);

								acuracy.x = -50 + acuracyLevel;
								acuracy.y = 50 - acuracyLevel;
								
								touchTrav.x = touchTrav.x + Random.Range(acuracy.x, acuracy.y);

								if(touchTrav.y <= percentageMinMax.x && touchTrav.y >= percentageMinMax.y)
								{
									force = new Vector3 (touchTrav.x, 700, 450);
									Analytic("Ok", touchTrav.y);
								}
								else if(touchTrav.y < percentageMinMax.x)
								{
									force = new Vector3 (touchTrav.x, (touchTrav.y/percentageMinMax.x) * 700, 450);
									Analytic("Short", touchTrav.y);
								}
								else if(touchTrav.y > percentageMinMax.y)
								{
									force = new Vector3 (touchTrav.x, (touchTrav.y/percentageMinMax.y) * 700, 450);
									Analytic("Too far", touchTrav.y);
								}


								/*
								Old swipe
								if(touchTrav.y <= forceMinMax.y && touchTrav.y >= forceMinMax.x)
								{
									force = new Vector3 (touchTrav.x, 700, 450);
									Analytic("Ok", touchTrav.y);
								}
								else if(touchTrav.y < forceMinMax.x)
								{
									force = new Vector3 (touchTrav.x, (touchTrav.y/forceMinMax.x) * 700, 450);
									Analytic("Short", touchTrav.y);
								}
								else if(touchTrav.y > forceMinMax.y)
								{
									force = new Vector3 (touchTrav.x, (touchTrav.y/forceMinMax.y) * 700, 450);
									Analytic("Too far", touchTrav.y);
								}
								*/

								Fire();
							}
							break;
	}
	
	if(Input.GetKeyDown(KeyCode.P))
	{
		force = new Vector3(Random.Range(-20, 20), Random.Range(600, 800), 450);
		Fire();
	}
	
	if(Input.GetKeyDown(KeyCode.C))
	{
		force = new Vector3(0, 700, 450);
		Fire();
	}
	
	if(finishReload > Time.time)
	{
		time = Time.time;
		timeLeft = finishReload - time;
		reloadPercent = (((timeLeft / reloadTime) / 2) + 0.5);
		reloadImage.GetComponent.<Renderer>().material.SetFloat("_Cutoff", reloadPercent); 
	}
	
	if(finishReload <= Time.time)
	{
		reloadImage.SetActive(false);
		reloaded = true;
	}
}

function Fire()
{
	if(!Boat.isDead)
	{	
		if(once && reloaded && selected && hasAmmo)
		{
			audioSource.PlayOneShot(cannonSound);
			var childBall = Instantiate(ball, ballPos, transform.rotation);
			childBall.transform.parent = cannon.transform;
			Instantiate(explosionParticles, ballPos, transform.rotation);
			reloadImage.SetActive(true);
			reloaded = false;
			finishReload = reloadTime + Time.time;
			once = false;
			shotCounter++;

			//take one away from type and then update the ammo in cannonController
			switch (type.ToString())
			{

				case "Normal": 
				break;

				case "Slow": cannonController.GetComponent(CannonController).slowShots --;
				break;

				case "Heavy": cannonController.GetComponent(CannonController).heavyShots --;		  
				break;

				case "Fire": cannonController.GetComponent(CannonController).fireShots --;
				break;
			}

			cannonController.GetComponent(CannonController).UpdateAmmo();
		}
	}
}

function OnMouseDown () 
{
	if(hasAmmo)
	{
		cannonController.GetComponent(CannonController).Selected();
		selected = true;
	}
}

function Analytic(name: String, num: float)
{
	//Test for analytics. Might change. 
	var params = new System.Collections.Generic.Dictionary.<System.String,System.Object>();
	params.Add("Distance", num);
	var returnVal = Analytics.Analytics.CustomEvent(name, params);
	Debug.Log(returnVal);
}