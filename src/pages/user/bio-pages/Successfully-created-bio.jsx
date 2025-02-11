import { Box, Flex, Text,Stack,Image, Button, Group } from '@mantine/core'
import { Download , Bell} from 'lucide-react'
import React from 'react'
import { groupAvatar } from '../../../assets';
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { GetPageAppearance, GetPagePreview,GetSuccessfullyPreview } from "../../../services/utils"
import Error from "../../../components/common/error"
import Loader from "../../../components/common/loader"


function SuccessfullyCreatedBio() {

   const { path } = useParams()
   const { id } = useParams()


   const { data, status, isFetching } = useQuery({
    queryKey: ["bio-page-preview", path],
    queryFn: () => GetSuccessfullyPreview(id),
  })

   const { bioImage , image_type} = useSelector((state) => state.GeneralSlice)

   console.log("bioImage from successfully ====>",bioImage)
   console.log("image_type from successfully ====>",image_type)

    if (status === "pending" ) return <Loader />
    if (status === "error" ) return <Error />
    if (status === "success" && !data.data) return <Error />

  return (
    <>
      <div
          style={{
            height:"80vh",
            display:"flex",
            justifyContent:"center",
            flexDirection:"column",
            alignItems:"center"
        }}
      >
          <Box  my="md">
               <Stack gap="xs">
                    <Text fw={700} style={{
                        fontSize:'30px'
                    }}
                    > لينكاتك أصبحت جاهزة
                    </Text>
                    <Text
                    fw={500}
                    size="lg"
                    style={{
                        color:"#969696",
                        textAlign:"center"
                    }}
                    >
                        حان الوقت لتشاركه مع العالم 
                    </Text>
               </Stack>
               <Text
                 style={{
                     color:"#969696",
                     textAlign:"center"
                 }}
               >
                https://app.linkatik.com/ar/preview/{data?.data?.path}
               </Text>
          </Box>
           <Box 
            style={{
                height:"400px",
                width:"300px",
                borderRadius:"12px",
                padding:"20px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"space-between"
            }}
            className=' shadow'
           >
             <div 
             style={{
                display:"flex",
                justifyContent:'space-between',
                alignItems:"center",
             }}
             >
               <span style={{display:"flex", padding:"7px 10px",height:"30px",borderRadius:"12px",alignItems:"center",justifyContent:"space-between", gap:"10px"}} className='shadow'>
                   <p>Subscribe</p>
                   <Bell size={20} />
                </span>
                <span style={{display:"flex", width:'30px',height:"30px",borderRadius:"50%",alignItems:"center",justifyContent:"center"}} className='shadow'>
                   <Download size={20} />
                </span>
             </div>
             <div 
              style={{
                display:"flex",
                justifyContent:"center",
                margin:"15px 0",
                flexDirection:"column",
                alignItems:"center"
              }}
             >
                <Stack gap='xs' align="center" >                    
                    <Box 
                        w={80} 
                        h={80}
                        radius={"50%"}
                        style={{
                        border: "2px solid #8938b2",
                        overflow: "hidden",
                        borderRadius:"50%",
                        }}
                        >
                        <Image
                            src={image_type === 'custom' ? bioImage : bioImage.image  }
                            alt="img"
                        />
                    </Box>
                    <Text
                      fw={500}
                      size="xl"
                      style={{
                        width:"100%",
                        textAlign:"center"
                      }}   
                    >
                       {data?.data?.title }
                    </Text>
                </Stack>
                    <Text
                      fw={500}
                      lineClamp={6}
                      size="md"
                      style={{
                        width:"100%",
                        textAlign:"center",
                        marginTop:"-5px"
                        
                      }}   
                    >
                        {data?.data?.bio}
                    </Text>
             </div>
             <div className='flex items-center relative w-full h-[40px] '   style={{marginTop:"80px"}}>
               <button className=' absolute top-0 -right-[35px] md:-right-[45px] bg-[#8938B2] rounded-2xl w-[160px] text-white cursor-pointer' style={{fontSize:"12px",height:"40px",}}>شارك لينكاتك</button>
               <a href={data?.data?.id ? `/ar/user/bio-pages/${data.data.id}/${path}` : "#"}>
               <button className=' absolute top-0 -left-[35px] md:-left-[45px] rounded-2xl w-[160px] text-[#8938B2] cursor-pointer' style={{fontSize:"12px", color:"#8938B2", background:"#E5D1FF",height:"40px"}}>اكمل التعديل</button>
               </a>
             </div>
          </Box>
      </div>
      </>
  )
}

export default SuccessfullyCreatedBio
