#pragma strict

public var speed: float;
public var Vspeed: float;
public var attackSpeed: float;
public var attackPos: float;
public var EndOfBoat: float;
public var StartOFBoat: float;
public var maxHeight: float;
public var minHeight: float;
public var isAttacking: boolean;
public var force: Vector3;
public var once: boolean;


function Start () 
{
	//Decide at what point the bird will attack the boat
	attackPos = Random.Range(EndOfBoat, StartOFBoat);
	if(transform.position.x > 50)
	{
		force.x = Random.Range(-450, -550);
	}
	else
	{
		force.x =  Random.Range(550, 650);
		
	}
	
	this.gameObject.GetComponent.<Rigidbody>().useGravity = true;
	this.gameObject.GetComponent.<Rigidbody>().AddForce(force);
}

function Update () 
{
	if(Input.GetKeyDown(KeyCode.B))
	{
		this.gameObject.GetComponent.<Rigidbody>().useGravity = true;
		this.gameObject.GetComponent.<Rigidbody>().AddForce(force);
	}	


	if(this.gameObject.GetComponent.<Rigidbody>().velocity.y <= 0)
	{
		//this.gameObject.GetComponent.<Rigidbody>().AddForce(new Vector3(0, -2, 0));
		this.gameObject.GetComponent.<Rigidbody>().drag = 0.5;
		
		
		/*if(transform.position.x < 28 && !once)
		{
			this.gameObject.GetComponent.<Rigidbody>().AddForce(new Vector3(20,200,0));
			once = true;
		}
		else if(transform.position.x > 58 && !once)
		{
			this.gameObject.GetComponent.<Rigidbody>().AddForce(new Vector3(-20,200,0));
			once = true;
		}*/
		
		if(transform.position.y <= 152 && transform.position.x < 31)
		{
			this.gameObject.GetComponent.<Rigidbody>().AddForce(new Vector3(100,500,0));
		}
		else if(transform.position.y <= 152 && transform.position.x > 50)
		{
			this.gameObject.GetComponent.<Rigidbody>().AddForce(new Vector3(-100,500,0));
		}
		
		
	}
	
/*	//flight for the bird
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
		}*/

}

function OnMouseDown()
{
	Debug.Log("Destroy");
	Destroy(this.gameObject);
}

function OnCollisionEnter(other: Collision)
{
	if(other.gameObject.tag == "BoatObj")
	{
		yield WaitForSeconds(1);
		Destroy(this.gameObject);
	}
	
	if(other.gameObject.tag == "Water")
	{
		yield WaitForSeconds(1);
		Destroy(this.gameObject);
	}
}
