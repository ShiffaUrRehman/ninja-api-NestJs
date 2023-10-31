import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjaService } from './ninja.service';
import { NotFoundError } from 'rxjs';
import { BeltGuard } from 'src/belt/belt.guard';


@Controller('ninja')
export class NinjaController {
    constructor(private readonly ninjaService: NinjaService){}

    // GET /ninja?weapon=stars --> []
    @Get()
    getNinjas(@Query('weapon') weapon: "stars" | "nunchucks"){
        return this.ninjaService.getNinjas(weapon);
    }

    // GET /ninja/:id --> {...}
    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id: number){
       try
       { return this.ninjaService.getNinja(id);}
       catch(err){
        throw new NotFoundException();
       }
    }

    // POST /ninja
    @Post()
    @UseGuards(BeltGuard)
    createNinja(@Body(new ValidationPipe) createNinjaDto: CreateNinjaDto){
        return this.ninjaService.createNinja(createNinjaDto);
    }

    // PUT /ninja/:id --> {...}
    @Put(':id')
    updateNinja(@Param('id') id: String, @Body() updateNinjaDto: UpdateNinjaDto){
        return this.ninjaService.updateNinja(+id,updateNinjaDto);
    }

    // DELETE /ninja/:id
    @Delete(':id')
    removeNinja(@Param('id') id: String){
        
        return this.ninjaService.removeNinja(+id);
    }
}

