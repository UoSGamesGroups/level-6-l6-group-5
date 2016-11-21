#pragma strict

public var touchStart: Vector2;
public var touchEnd: Vector2;
public var touchDistanceX: float;
public var anim: Animator;
public var canKill: boolean;
public var valid: boolean;
public var boatXPos: Vector2;
public var kraken: GameObject;
public var leftPos: Vector3;
public var clicked: Vector3;
public var lift: Vector3;
public var clickedTime: float;
public var clickedPos: int;
public var cam: GameObject;
public var pos: int;

function Start () 
{
	anim = GetComponent(Animator);
	kraken = this.gameObject;
	Down();
}
 
function Update()
{
	//Gets touch input. If touch starts near tenticle and ends next to it and is killable then kill it
	if (Input.touchCount > 0)
	var touch: Touch = Input.GetTouch(0);
	
	switch(touch.phase)
	{
	
	case TouchPhase.Began: if(touch.position.x > 400 && touch.position.x < 500)
							{
								if(touch.position.y > 160 && touch.position.y < 230)
								{
									touchStart = touch.position;
									valid = true;
								}
								else
								{
									valid = false;
								}
							}
							else 
							{
								valid = false;
							}	
							break;
	case TouchPhase.Ended:  touchEnd = touch.position;
							touchDistanceX = touchStart.x - touchEnd.x;
							if (touchDistanceX < - 100 && valid)
							{
								Debug.Log("Kraken Hit");
								if(canKill)
								{
									//Kill();
								}
							}
							break;
	}
	
if(Input.GetKeyDown(KeyCode.K))
{
	Destroy(this.gameObject);
	GetComponentInParent(Boat).hasKraken = false;
}
} 

//Loops through animation of up and down
function Down () 
{
	anim.SetBool("Down", true);
	anim.SetBool("Up", false);
	canKill = false;
	
	yield WaitForSeconds(Random.Range(2,4));
	
	Up();
}

function Up () 
{
	anim.SetBool("Down", false);
	anim.SetBool("Up", true);
	canKill = true;
	
	yield WaitForSeconds(Random.Range(2,4));
	
	Hold();
}

function Hold() 
{
	Down();
	MovePos();
}


function MovePos()
{
	kraken.transform.position.x = Random.Range(boatXPos.x, boatXPos.y);
	pos ++;
}

function OnMouseDown()
{
	cam = GameObject.FindGameObjectWithTag("BoatCamera");
	
	Debug.Log("Down");
	clicked = cam.GetComponent(Camera).WorldToScreenPoint(Input.mousePosition);
	clickedTime = Time.time;
	clickedPos = pos;
}

function OnMouseUp()
{
	Debug.Log("Up");
	
	lift = cam.GetComponent(Camera).WorldToScreenPoint(Input.mousePosition);
	
	Debug.Log(lift.x - clicked.x);
	
	if(Time.time - clickedTime <= 1 && lift.x - clicked.x >= 2000 && lift.x - clicked.x <= 3000 && clickedPos == pos)
	{
		Kill();
	}
}

function Kill ()
{
	Destroy(this.gameObject);
	GetComponentInParent(Boat).hasKraken = false;
}
