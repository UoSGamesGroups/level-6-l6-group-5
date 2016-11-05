#pragma strict

public var fire1: ParticleSystem;
public var fire2: ParticleSystem;
public var fire3: ParticleSystem;
public var fire1Obj: GameObject;
public var fire2Obj: GameObject;
public var fire3Obj: GameObject;
public var fire1Lifetime: float;
public var fire2Lifetime: float;
public var fire3Lifetime: float;
public var smoke: GameObject;

function Start () 
{
	//Sets only middle fire to visible
	fire1Obj.SetActive(false);
	fire2Obj.SetActive(true);
	fire3Obj.SetActive(false);	
}

function FixedUpdate () 
{
	//Sets lifetimes of particles for all fires
	fire1.startLifetime = fire1Lifetime;
	fire2.startLifetime = fire2Lifetime;
	fire3.startLifetime = fire3Lifetime;
	
	//Increases middle fires lifetime and stops at 1.6
	fire2Lifetime += 0.002;
	fire2Lifetime = Mathf.Min(1.6, fire2Lifetime);
	
	//If middle fire big enough spread left
	if(fire2Lifetime > 1)
	{
		fire1Obj.SetActive(true);
		fire1Lifetime += 0.002;
		fire1Lifetime = Mathf.Min(1.6, fire1Lifetime);
	}
	
	//If left fire big enough spread right
	if(fire1Lifetime > 1)
	{
		fire3Obj.SetActive(true);
		fire3Lifetime += 0.002;
		fire3Lifetime = Mathf.Min(1.6, fire3Lifetime);
	}
	
	//If left fire too small hide
	if(fire1Lifetime < 0.4)
	{
		fire1Obj.SetActive(false);
	}

	//If right fire too small hide
	if(fire3Lifetime < 0.4)
	{
		fire3Obj.SetActive(false);
	}
	
	//If all fires to big die
	if(fire1Lifetime > 1.5 && fire2Lifetime > 1.5 && fire3Lifetime > 1.5)
	{
		Debug.Log("Dead");
	}
		
	//If all fires to small remove fire
	if(fire1Lifetime < 0.4 && fire2Lifetime < 0.4 && fire3Lifetime < 0.4)
	{
		Instantiate(smoke, transform.position, transform.rotation);
		GetComponentInParent(Boat).hasFire = false;
		Destroy(this.gameObject);
	}
}

function OnMouseDown()
{
	//When clicked remove lifetime from fire and make sure higher than 0.38
	fire2Lifetime -= 0.05;
	fire1Lifetime -= 0.05;
	fire3Lifetime -= 0.05;
	
	fire1Lifetime = Mathf.Max(0.38, fire1Lifetime);
	fire2Lifetime = Mathf.Max(0.38, fire2Lifetime);
	fire3Lifetime = Mathf.Max(0.38, fire3Lifetime);
	
}