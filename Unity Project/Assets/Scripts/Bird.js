#pragma strict

public var speed: float;
public var Vspeed: float;
public var attackSpeed: float;
public var attackPos: float;
public var EndOfBoat: float;
public var maxHeight: float;
public var minHeight: float;
public var StartOFBoat: float;
public var isAttacking: boolean;

function Start () 
{
//Decide at what point the bird will attack the boat
	attackPos = Random.Range(EndOfBoat, StartOFBoat);
}

function Update () 
{
//flight for the bird
	if (!isAttacking)
		{
			transform.position.x -= speed * Time.deltaTime; 
//Makes the bird fly up and down in a bobbing motion
			transform.position.y += Vspeed * Time.deltaTime; 
			if (transform.position.y > maxHeight)
				{
				Vspeed = Vspeed * -1;
				}
			if (transform.position.y < minHeight)
				{
				Vspeed = Vspeed * -1;
				}

		}
//if bird is attacking do this
		else
		transform.position.y -= attackSpeed * Time.deltaTime;
//if the bird hits the attack pos, attack!
	if (transform.position.x <= attackPos)
		{
			isAttacking = true;
		}

}

function OnMouseDown()
{
	Destroy(this.gameObject);
}

function OnCollisionStay(other : Collision)
{
	Debug.Log("Collided");
	if(other.gameObject.tag == "Boat") 
	{
		Destroy(this.gameObject);
	}
}
