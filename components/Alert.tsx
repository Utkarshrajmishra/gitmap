import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AlertTypes={
    title:string,
    desc:string,
    show:boolean,
    setShow:(show:boolean)=>void;
}

export function Alert({title, desc, show,setShow}:AlertTypes) {
  return (
    <AlertDialog open={show}>
      <AlertDialogContent className="border border-zinc-600 bg-black text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="border border-zinc-600" onClick={()=>setShow(false)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
