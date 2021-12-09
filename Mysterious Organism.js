// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  // Creating my object factory
  const pAequorFactory = (specimenNum, dna) =>{
    return {
      specimenNum : specimenNum,
      dna : dna,
      mutate(){
        console.log(this.dna);
        let randomIndex = Math.floor(Math.random() * 15);
        let originalBase = this.dna[randomIndex];
        let mutatedIndex = Math.floor(Math.random() * 3);
        let mutatedBase = ''
        let mutatedDna = []
        if(originalBase === 'A'){
          let newBases = ['T', 'C', 'G'];
          mutatedBase = newBases[mutatedIndex];
        } else if (originalBase === 'T'){
          newBases = ['A', 'C', 'G'];
          mutatedBase = newBases[mutatedIndex];
        } else if (originalBase === 'C'){
          newBases = ['A', 'T', 'G'];
          mutatedBase = newBases[mutatedIndex];
        } else if (originalBase === 'G'){
          newBases = ['A', 'C', 'T'];
          mutatedBase = newBases[mutatedIndex];
        } 
        this.dna[randomIndex] = mutatedBase;
        mutatedDna = this.dna
        return mutatedDna;
  
        },
        compareDNA(obj){
          let firstSample = this.dna;
          let secondSample = obj.dna;
          let counter = 0;
          let percentage;
          for (let i = 0; i < firstSample.length; i++){
            for (let j = 0; j < secondSample.length; j++){
              if(i === j && firstSample[i] === secondSample[j]){
                counter += 1;
              }
            }
          }
          percentage = (counter / this.dna.length) * 100;
          percentage = percentage.toFixed(0);
          console.log(`Specimen ${this.specimenNum} and ${obj.specimenNum} have ${percentage}% DNA in common.`)
        },
        willLikelySurvive(){
          let cCounter = 0;
          let gCounter = 0;
          for(let c = 0; c < this.dna.length; c++){
            if(this.dna[c] === 'C'){
              cCounter += 1;
            }
            if(this.dna[c] === 'G'){
              gCounter += 1;
            }
          }
          let cPercentage = ((cCounter / this.dna.length) * 100).toFixed(0);
          // console.log(cPercentage);
          let gPercentage = ((gCounter / this.dna.length) * 100).toFixed(0);
          // console.log(gPercentage);
  
          if (cPercentage >= 60 || gPercentage >= 60){
            return true;
          }else{
            return false;
          }
  
        }
    }
      
      }
  
  
  // Finding the specimenNum of likely survivors
  let survivors = [];
  let specimenCount = 0;
  while (survivors.length < 30){
    specimenCount += 1;
    let specimen = pAequorFactory(specimenCount, mockUpStrand());
    if(specimen.willLikelySurvive() === true){
      survivors.push(specimen.specimenNum);
    }
  }
  console.log(survivors);
  
  