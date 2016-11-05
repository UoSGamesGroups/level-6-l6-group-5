#pragma strict

public var touchStart: Vector2;
public var touchEnd: Vector2;
public var touchDistanceX: float;
public var anim: Animator;
public var canKill: boolean;

function Start () 
{
	anim = GetComponent(Animator);
	
	Down();
}
 
function Update()
{
	if (Input.touchCount > 0)
	var touch: Touch = Input.GetTouch(0);
	
	switch(touch.phase)
	{
	
	case TouchPhase.Began: if(touch.position.x > 100 && touch.position.x < 200)
							{
								if(touch.position.y > 100 && touch.position.y < 200)
								{
									touchStart = touch.position;
								}
							}	
							break;
	case TouchPhase.Ended:  touchEnd = touch.position;
							touchDistanceX = touchStart.x - touchEnd.x;
							if (touchDistanceX < - 100)
							{
								Debug.Log("Swipe right");
								Destroy(this.gameObject);
							}
							break;
	}
} 

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
	UpHold();
}

function UpHold() 
{
	Down();
}

