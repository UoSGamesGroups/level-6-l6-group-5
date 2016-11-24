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
public var once: boolean; 


function Start () 
{
	enemy = GameObject.FindGameObjectWithTag("Enemy");
}

function Update () 
{
	transform.LookAt(enemy.transform, Vector3.forward);
	transform.rotation.z = 0;
	transform.rotation.x = 0;
	
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
								Mathf.Max(touchTrav.y, 0);
								
								if(touchTrav.y <= forceMinMax.y && touchTrav.y >= forceMinMax.x)
								{
									force = new Vector3 (0, 800, 650);
								}
								else if(touchTrav.y < forceMinMax.x)
								{
									force = new Vector3 (0, (touchTrav.y/forceMinMax.x) * 800,650);
								}
								else if(touchTrav.y > forceMinMax.y)
								{
									force = new Vector3 (0, (touchTrav.y/forceMinMax.y) * 800,650);
								}

								Fire();
							}
							break;
	}
	
	if(Input.GetKeyDown(KeyCode.C))
	{
		Fire();
	}
}

function Fire()
{
	if(once)
	{
		clicked = false;
		var childBall = Instantiate(ball, ballPos, transform.rotation);
		childBall.transform.parent = cannon.transform;
		once = false;
	}
}

function OnMouseDown () 
{
	clicked = true;
}

function OnMouseUp () 
{
	clicked = false;
}