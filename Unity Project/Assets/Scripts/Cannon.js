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
public var shotCounter: int;

function Start () 
{
	enemy = GameObject.FindGameObjectWithTag("Enemy");
	//transform.LookAt(enemy.transform, Vector3.forward);
	//transform.rotation.z = 0;
	//transform.rotation.x = -270;
	acuracyLevel = PlayerPrefs.GetInt("Cannon");
	
	reloadTime = 1.25 - (PlayerPrefs.GetInt("Reload") / 10);
}

function Update () 
{
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

								if(touchTrav.y <= forceMinMax.y && touchTrav.y >= forceMinMax.x)
								{
									force = new Vector3 (touchTrav.x, 800,-650);
									Analytic("Ok", touchTrav.y);
								}
								else if(touchTrav.y < forceMinMax.x)
								{
									force = new Vector3 (touchTrav.x, (touchTrav.y/forceMinMax.x) * 800,-650);
									Analytic("Short", touchTrav.y);
								}
								else if(touchTrav.y > forceMinMax.y)
								{
									force = new Vector3 (touchTrav.x, (touchTrav.y/forceMinMax.y) * 800,-650);
									Analytic("Too far", touchTrav.y);
								}

								Fire();
							}
							break;
	}
	
	if(Input.GetKeyDown(KeyCode.P))
	{
		force = new Vector3(Random.Range(-20, 20), Random.Range(700, 900), -650);
		Fire();
	}
	
	if(Input.GetKeyDown(KeyCode.C))
	{
		force = new Vector3(0, 800, -650);
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
	if(once && reloaded)
	{
		//clicked = false;
		var childBall = Instantiate(ball, ballPos, transform.rotation);
		childBall.transform.parent = cannon.transform;
		reloadImage.SetActive(true);
		reloaded = false;
		finishReload = reloadTime + Time.time;
		once = false;
		shotCounter++;
	}
}

function OnMouseDown () 
{
	//clicked = true;
}

function OnMouseUp () 
{
	//clicked = false;
}

function Analytic(name: String, num: float)
{
	//Test for analytics. Might change. 
	var params = new System.Collections.Generic.Dictionary.<System.String,System.Object>();
	params.Add("Distance", num);
	var returnVal = Analytics.Analytics.CustomEvent(name, params);
	Debug.Log(returnVal);
}