#pragma strict

public var touchStart: Vector2;
public var touchEnd: Vector2;
public var touchDistanceX: float;
public var anim: Animator;
public var canKill: boolean;
public var valid: boolean;

function Start () 
{
	anim = GetComponent(Animator);
	
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
									Destroy(this.gameObject);
									GetComponentInParent(Boat).hasKraken = false;
									
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
	yield WaitForSeconds(5);
	Up();
}

function Up () 
{
	anim.SetBool("Down", false);
	anim.SetBool("Up", true);
	canKill = true;
	yield WaitForSeconds(5);
	Hold();
}

function Hold() 
{
	Down();
}

